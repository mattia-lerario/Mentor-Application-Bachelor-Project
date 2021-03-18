const { array } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    mentorName: { type : String, required: true },
    mentorNumber: {type : String}, //muligens endre til require
    tlfNumber: {type : String},
    email: { type: String, unique: true, required: true },
    mentorDescription: { type: String, required: true }, //bio

    /*
    industriExpertise:[
        {type : String}
    ],
    mentorExpertise:[
        {type : String}
    ],
    workExperience:[
        title: {type:String},
        description: {type : String},
        
    ],  
    
    */

    accounts: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account"
        },
    companies:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company" 
        }
    ]
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

module.exports = mongoose.model('Mentor', schema);