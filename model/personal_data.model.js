const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Address = require('./address.model').schema;

let PersonalData = new Schema(
    {
        names: {type: String, required: true},
        lastname: {type: String, required: true},
        identificationNumber: {type: String, required: true},
        birthPlace: {type: String, required: true},
        birthDate: {type: Date, required: true},
        utnFile: {type: String, required: true},
        phone: {type: String, required: true},
        mobile: {type: String, required: true},
        email: {type: String, required: true},
        address:{type: Address, default: Address},
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    });

module.exports = mongoose.model('PersonalData', PersonalData);