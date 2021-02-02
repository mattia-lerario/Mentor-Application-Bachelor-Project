const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    Company: require('company/company.model'),
    Mentor: require('mentors/mentor.model'),

    //Account: require('accounts/mentors.model'),
    isValidId
};



function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}