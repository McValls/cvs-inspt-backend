const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Address = new Schema(
    {
        street: {type: String, required: true},
        number: {type: String, required: true},
        floor: {type: String, required: false},
        apartment: {type: String, required: false},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        province: {type: String, required: true},
    });

module.exports = mongoose.model('Address', Address);