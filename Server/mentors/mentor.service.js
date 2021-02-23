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

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
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
