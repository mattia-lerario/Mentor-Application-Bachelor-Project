
const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    companyName: { type : String, required: true },
    companyNumber: {type : String}, //muligens endre til require
    tlfNumber: {type : String},
    email: { type: String, required: true },
    salesRevenue: { type: String,required: true},
    //valuation: { type: String,required: true},
    companyDescription: { type: String, required: true },
    role: { type: String},
    phase: { type: String},
    
    hoursSpendtOnCompany:[
        {     
        hours: {type: Number},
        byMentor:{type: mongoose.Schema.Types.ObjectId, ref: "Mentor"},
        dateOfWork:{type: Date}
        }],

    powerRanking:[
        {
        question1: {type: Number, min: 0, max: 6},
        question2: {type: Number, min: 0, max: 6},
        question3: {type: Number, min: 0, max: 6},
        question4: {type: Number, min: 0, max: 6},
        question5: {type: Number, min: 0, max: 6},
        question6: {type: Number, min: 0, max: 6},
        question7: {type: Number, min: 0, max: 6},
        question8: {type: Number, min: 0, max: 6},
        question9: {type: Number, min: 0, max: 6},
        question10: {type: Number, min: 0, max: 6},
        question11: {type: Number, min: 0, max: 6},
        quarter: {type: Number, min: 0, max: 6},
        year: {type: Date}, 
        }],
        developCheckList:[
        {
        question1: {type: Boolean,},
        comment1: {type:String},
        question2: {type: Boolean},
        comment2: {type:String},
        question3: {type: Boolean},
        comment3: {type:String},
        question4: {type: Boolean},
        comment4: {type:String},
        question5: {type: Boolean},
        comment5: {type:String},
        question6: {type: Boolean},
        comment6: {type:String},
        question7: {type: Boolean},
        comment7: {type:String},
        question8: {type: Boolean},
        comment8: {type:String},
        quarter: {type: Number, min: 0, max: 4},
        year: {type: Date}, 
        }],
        launchCheckList:[
        {
        question1: {type: Boolean,},
        comment1: {type:String},
        question2: {type: Boolean},
        comment2: {type:String},
        question3: {type: Boolean},
        comment3: {type:String},
        question4: {type: Boolean},
        comment4: {type:String},
        question5: {type: Boolean},
        comment5: {type:String},
        question6: {type: Boolean},
        comment6: {type:String},
        question7: {type: Boolean},
        comment7: {type:String},
        question8: {type: Boolean},
        comment8: {type:String},
        quarter: {type: Number, min: 0, max: 4},
        year: {type: Date}, 
        }],
        potentialExitCheckList:[
        {
        question1: {type: Boolean,},
        comment1: {type:String},
        question2: {type: Boolean},
        comment2: {type:String},
        question3: {type: Boolean},
        comment3: {type:String},
        quarter: {type: Number, min: 0, max: 4},
        year: {type: Date}, 
        }],
        scalingCheckList:[
        {
        question1: {type: Boolean,},
        comment1: {type:String},
        question2: {type: Boolean},
        comment2: {type:String},
        question3: {type: Boolean},
        comment3: {type:String},
        question4: {type: Boolean},
        comment4: {type:String},
        question5: {type: Boolean},
        comment5: {type:String},
        question6: {type: Boolean},
        comment6: {type:String},
        question7: {type: Boolean},
        comment7: {type:String},
        question8: {type: Boolean},
        comment8: {type:String},
        quarter: {type: Number, min: 0, max: 4},
        year: {type: Date}, 
        }],
        teamAndIdeaFormationCheckList:[
        {
        question1: {type: Boolean,},
        comment1: {type:String},
        question2: {type: Boolean},
        comment2: {type:String},
        question3: {type: Boolean},
        comment3: {type:String},
        question4: {type: Boolean},
        comment4: {type:String},
        question5: {type: Boolean},
        comment5: {type:String},
        question6: {type: Boolean},
        comment6: {type:String},
        question7: {type: Boolean},
        comment7: {type:String},
        question8: {type: Boolean},
        comment8: {type:String},
        question9: {type: Boolean},
        comment9: {type:String},
        question10: {type: Boolean},
        comment10: {type:String},
        quarter: {type: Number, min: 0, max: 4},
        year: {type: Date},  
        }],
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
      }
    ],
    leadMentor:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor" 
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

module.exports = mongoose.model('Company', schema);