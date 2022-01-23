const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const UserSchema = mongoose.Schema({
     name: {
          type: String,
          required: [true, 'Please enter your name'],
          maxlength: [30, 'Your name cannnot exceed 30 characters']
     },
     email: {
          type: String,
          required: [true, 'Please enter your email'],
          unique: true,
          validate: [validator.isEmail, 'Please enter valid email address']
     },
     password: {
          type: String,
          required: [true, 'Please enter your password'],
          minlength: [6, 'You password must be longer then 6 characters'],
          select: false
     },
     avtar: {

          public_id: {
               type: String,
               required: true
          },
          url: {
               type: String,
               required: true
          }
     },
     role: {
          type: String,
          default: 'user'
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date
}, { timestamps: true });

// EncryptPassword before saving 
UserSchema.pre('save', async function (next) {
     if (!this.isModified('password')) {
          next();
     }
     this.password = await bcrypt.hash(this.password, 12)
});

UserSchema.methods = {
     // return jwt token 
     getJwtToken: function () {
          return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
               expiresIn: process.env.JWT_EXPIRES_TIME
          });
     },
     // compare password
     comparePassword: function (enteredPassword) {
          return bcrypt.compare(enteredPassword, this.password)
     },
     // Generate password reset token
     getResetPasswordToken: function () {
          // Generate token 
          const resetToken = crypto.randomBytes(20).toString('hex');

          // Encrypt Token
          this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
          this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

          return resetToken;
     }

};

module.exports = mongoose.model('User', UserSchema)