const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('becryptjs');

const userSchema = new Schema({
    email: String,
    inviteToken: String,
    active: Boolean,
    admin: Boolean,
    password: String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
module.exports.hashedPassword = async (passowrd) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await crypto.hash(passowrd, salt);
    } catch (error) {
        throw new Error('Failed to hash password :(', error);
    };   
}
module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }
    catch (error) {
        throw new Error('Passwords dont match :(', error);
    }; 
}