const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EducationItem = new Schema(
    {
        itemType: {type: String, required: true},
        denomination: {type: String, required: false},
        institution: {type: String, required: false},
        fromYear: {type: String, required: false},
        toYear: {type: String, required: false},
        title: {type: String, required: false},
        tesisTitle: {type: String, required: false},
        years: {type: String, required: false},
        place: {type: String, required: false},
        skill: {type: String, required: false},
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    }
)

module.exports = mongoose.model('EducationItem', EducationItem);