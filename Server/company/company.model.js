const { object } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    companyName: { type : String, required: true },
    companyNumber: {type : String}, //muligens endre til require
    tlfNumber: {type : String},
    email: { type: String, unique: true, required: true },
    salesRevenue: { type: String,required: true},
    companyDescription: { type: String, required: true },
    role: { type: String},    
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Company', schema);