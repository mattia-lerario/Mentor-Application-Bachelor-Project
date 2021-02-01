const { array } = require('joi');
const { Int32, Long } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    companyName: { type : String, required: true },
    companyNumber: {type : Int32}, //muligens endre til require
    tlfnumber: {type : Int32},
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    salesRevenue: { type: Int32},
    companyDescription: { type: String, required: true },
    lastName: { type: String, required: true },
    acceptTerms: Boolean,
    role: { type: String, required: true },    
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

module.exports = mongoose.model('Account', schema);