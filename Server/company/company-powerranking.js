const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    token: String,
    expires: Date,
    leadmentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
    token: String,
    expires: Date,
    question1: {type: Int32Array, min: 0, max: 6},
    question2: {type: Int32Array, min: 0, max: 6},
    question3: {type: Int32Array, min: 0, max: 6},
    question4: {type: Int32Array, min: 0, max: 6},
    question5: {type: Int32Array, min: 0, max: 6},
    question6: {type: Int32Array, min: 0, max: 6},
    question7: {type: Int32Array, min: 0, max: 6},
    question8: {type: Int32Array, min: 0, max: 6},
    question9: {type: Int32Array, min: 0, max: 6},
    question10: {type: Int32Array, min: 0, max: 6},
    question11: {type: Int32Array, min: 0, max: 6},
    quarter1: {type: Boolean, default: false},
    quarter2: {type: Boolean, default: false},
    quarter3: {type: Boolean, default: false},
    quarter4: {type: Boolean, default: false},
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String,
    verified: {type: Boolean, default: false}
});

schema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

module.exports = mongoose.model('PowerRanking', schema);