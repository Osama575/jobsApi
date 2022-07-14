const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        maxlength: [50, 'Name must be less than 50 characters'],
        minlength: [3, 'Name must be at least 3 characters']
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [8, 'Password must be at least 8 characters'],
        
    },

})

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({ userid: this._id, name: this.name }, process.env.JWT_SECRET, 
        {
         expiresIn: process.env.JWT_LIFETIME,
        });
}

UserSchema.methods.comparePassword = async function(loginPassword) {
    const isMatch = await bcrypt.compare(loginPassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);
