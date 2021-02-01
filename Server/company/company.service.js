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
    const company = await db.company.findOne({ email });

    if (!company || !company.isVerified || !bcrypt.compareSync(password, company.passwordHash)) {
        throw 'Email or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(company);
    const refreshToken = generateRefreshToken(company, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(company),
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
    const company = await db.Company.find();
    return company.map(x => basicDetails(x));
}


async function getById(id) {
    const company = await getAccount(id);
    return basicDetails(company);
}

async function create(params) {
    // validate
    if (await db.Company.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const company = new db.Company(params);
    company.verified = Date.now();

    // hash password
    company.passwordHash = hash(params.password);

    // save account
    await company.save();

    return basicDetails(company);
}

async function update(id, params) {
    const company = await getAccount(id);

    // validate (if email was changed)
    if (params.email && account.email !== params.email && await db.Account.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = hash(params.password);
    }

    // copy params to account and save
    Object.assign(company, params);
    company.updated = Date.now();
    await company.save();
    return basicDetails(company);
}

async function _delete(id) {
    const company = await getAccount(id);
    await company.remove();
}

// helper functions

async function getAccount(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const company = await db.Company.findById(id);
    if (!company) throw 'Account not found';
    return company;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('account');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

function hash(password) {
    return bcrypt.hashSync(password, 10);
}

function generateJwtToken(company) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: company.id, id: company.id }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(company, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        account: company.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(company) {
    const { id, companyName, companyNumber, tlfNumber, email, salesRevenue, companyDescription} = company;
    return { id, companyName, companyNumber, tlfNumber, email, salesRevenue, companyDescription };
}




