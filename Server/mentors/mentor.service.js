const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    authenticate,
    //refreshToken,
    revokeToken,
    //register,
    //verifyEmail,
    //forgotPassword,
    //validateResetToken,
    //resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password, ipAddress }) {
    const mentorsModel = await db.Mentors.findOne({ email });

    if (!mentorsModel || !mentorsModel.isVerified || !bcrypt.compareSync(password, mentorsModel.passwordHash)) {
        throw 'Email or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(mentorsModel);
    const refreshToken = generateRefreshToken(mentorsModel, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(mentorsModel),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const { mentorsModel } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(mentorsModel, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(mentorsModel);

    // return basic details and tokens
    return {
        ...basicDetails(mentorsModel),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function register(params, origin) {
    // validate
    if (await db.Mentors.findOne({ email: params.email })) {
        // send already registered error in email to prevent mentorsModel enumeration
        return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    // create mentorsModel object
    const mentorsModel = new db.Mentors(params);

    // first registered mentorsModel is an admin
    const isFirstmentorsModel = (await db.Mentors.countDocuments({})) === 0;
    mentorsModel.role = isFirstmentorsModel ? Role.Admin : Role.User;
    mentorsModel.verificationToken = randomTokenString();

    // hash password
    mentorsModel.passwordHash = hash(params.password);

    // save mentorsModel
    await mentorsModel.save();

    // send email
    await sendVerificationEmail(mentorsModel, origin);
}

async function verifyEmail({ token }) {
    const mentorsModel = await db.Mentors.findOne({ verificationToken: token });

    if (!mentorsModel) throw 'Verification failed';

    mentorsModel.verified = Date.now();
    mentorsModel.verificationToken = undefined;
    await mentorsModel.save();
}

async function forgotPassword({ email }, origin) {
    const mentorsModel = await db.Mentors.findOne({ email });

    // always return ok response to prevent email enumeration
    if (!mentorsModel) return;

    // create reset token that expires after 24 hours
    mentorsModel.resetToken = {
        token: randomTokenString(),
        expires: new Date(Date.now() + 24*60*60*1000)
    };
    await mentorsModel.save();

    // send email
    await sendPasswordResetEmail(mentorsModel, origin);
}

async function validateResetToken({ token }) {
    const mentorsModel = await db.Mentors.findOne({
        'resetToken.token': token,
        'resetToken.expires': { $gt: Date.now() }
    });

    if (!mentorsModel) throw 'Invalid token';
}

async function resetPassword({ token, password }) {
    const mentorsModel = await db.Mentors.findOne({
        'resetToken.token': token,
        'resetToken.expires': { $gt: Date.now() }
    });

    if (!mentorsModel) throw 'Invalid token';

    // update password and remove reset token
    mentorsModel.passwordHash = hash(password);
    mentorsModel.passwordReset = Date.now();
    mentorsModel.resetToken = undefined;
    await mentorsModel.save();
}

async function getAll() {
    const mentorsModels = await db.Mentor.find();
    return mentorsModels.map(x => basicDetails(x));
}

async function getById(id) {
    const mentorsModel = await getmentorsModel(id);
    return basicDetails(mentorsModel);
}

async function create(params) {
    // validate
    if (await db.Mentors.findOne({ email: params.email })) {
       throw 'Email "' + params.email + '" is already registered';
    }

    const mentorsModel = new db.Mentors(params);
    mentorsModel.verified = Date.now();

    // hash password
    mentor.accounts = [params.user.id];
   // mentorsModel.passwordHash = hash(params.password);

    // save mentorsModel
    await mentorsModel.save();
    return basicDetails(mentorsModel);
   
}   

const addAccountToMentor = function(mentorId, account) {
    return db.Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { accounts: account._id } },
      { new: true, useFindAndModify: false }
    );
  };

async function update(id, params) {
    const mentorsModel = await getmentorsModel(id);

    // validate (if email was changed)
    if (params.email && mentorsModel.email !== params.email && await db.Mentors.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = hash(params.password);
    }

    // copy params to mentorsModel and save
    Object.assign(mentorsModel, params);
    mentorsModel.updated = Date.now();
    await mentorsModel.save();

    return basicDetails(mentorsModel);
}

async function _delete(id) {
    const mentorsModel = await getmentorsModel(id);
    await mentorsModel.remove();
}

// helper functions

async function getmentorsModel(id) {
    if (!db.isValidId(id)) throw 'mentorsModel not found';
    const mentorsModel = await db.Mentors.findById(id);
    if (!mentorsModel) throw 'mentorsModel not found';
    return mentorsModel;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('mentorsModel');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

function hash(password) {
    return bcrypt.hashSync(password, 10);
}

function generateJwtToken(mentorsModel) {
    // create a jwt token containing the mentorsModel id that expires in 15 minutes
    return jwt.sign({ sub: mentorsModel.id, id: mentorsModel.id }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(mentorsModel, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        mentorsModel: mentorsModel.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(mentorsModel) {
    const {id, mentorName, mentorNumber, tlfNumber,email,mentorDescription } = mentorsModel;
    return {id, mentorName, mentorNumber, tlfNumber,email,mentorDescription };
}

async function sendVerificationEmail(mentorsModel, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/mentorsModel/verify-email?token=${mentorsModel.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/mentorsModel/verify-email</code> api route:</p>
                   <p><code>${mentorsModel.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: mentorsModel.email,
        subject: 'Sign-up Verification API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
    let message;
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/mentorsModel/forgot-password">forgot password</a> page.</p>`;
    } else {
        message = `<p>If you don't know your password you can reset it via the <code>/mentorsModel/forgot-password</code> api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Sign-up Verification API - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(mentorsModel, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/mentorsModel/reset-password?token=${mentorsModel.resetToken.token}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/mentorsModel/reset-password</code> api route:</p>
                   <p><code>${mentorsModel.resetToken.token}</code></p>`;
    }

    await sendEmail({
        to: mentorsModel.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}