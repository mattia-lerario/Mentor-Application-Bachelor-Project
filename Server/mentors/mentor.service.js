const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
// const sendEmail = require('_helpers/send-email');
const db = require('../_helpers/db');
// const Role = require('_helpers/role');
const accountService = require('../accounts/account.service');

module.exports = {
    authenticate,
    revokeToken,
    getAll,
    getById,
    create,
    addCompanyToMentor,
    update,
    delete: _delete
};

async function authenticate({ email, password, ipAddress }) {
    const mentorsModel = await db.mentors.findOne({ email });

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

    const mentorsModel = new db.Mentor(params);
    mentorsModel.verified = Date.now();

     //Connect Account to Mentor
    mentorsModel.accounts = [params.user.id];
    // save mentorsModel

    await mentorsModel.save();
    
    //console.log(mentorsModel.id, mentorsModel.accounts);

    accountService.addMentorToAccount(mentorsModel.id, mentorsModel.accounts);
    
    return basicDetails(mentorsModel);
}   

async function addCompanyToMentor(companyId,mentorId) {
    return db.Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { companies: companyId } },
      { new: true, useFindAndModify: false }
    );
  }

async function update(id, params) {

    console.log("update id  "+id);
    const mentorsModel = await getmentorsModel(id);

    // copy params to mentorsModel and save
    Object.assign(mentorsModel, params);
       await mentorsModel.save();

    return basicDetails(mentorsModel);
}



async function _delete(id) {
    const mentorsModel = await getmentorsModel(id);
    await mentorsModel.remove();
}

// helper functions

async function getmentorsModel(id) {

    /*console.log("getmoentormodel "+id);
    if (!db.isValidId(id)) throw 'mentorsModel not found';

    const mentorsModel = await db.Mentors.findOneById(id);

    if (!mentorsModel) throw 'mentorsModel not found';

    return mentorsModel;*/
    //console.log(db.Mentor);

    const account = await db.Mentor.findById(id);

    if (!account) throw 'Account not found';

    return account;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('mentorsModel');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

/*function hash(password) {
    return bcrypt.hashSync(password, 10);
}*/

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

/*async function addMentorToAccount(mentorId, accountId) {
    return db.Account.findByIdAndUpdate(
      accountId,
      { $push: { mentors: mentorId} },
      { new: true, useFindAndModify: false }
    );
  };*/

function basicDetails(mentorsModel) {
    const {id, mentorFirstName, mentorLastName, tlfNumber,email,mentorDescription,industriExpertise,mentorExpertise,workExperience,account} = mentorsModel;
    return {id, mentorFirstName, mentorLastName, tlfNumber,email,mentorDescription,industriExpertise,mentorExpertise,workExperience,account};
}

