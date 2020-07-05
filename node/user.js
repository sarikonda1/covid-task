const mongoose = require('mongoose');
module.exports = mongoose.model('Users', new mongoose.Schema({ 
    name: { type: String, required: true},
    age: { type: String, required: true },
    address: { type: String , required: true},
    city: { type: String, required: true},
    latitude: { type: String, required: true},
    longitude: { type: String, required: true},
    status: { type: Boolean, default: false},
    file: {type: String}
}, { timestamps: true }));