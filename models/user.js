const mongoose = require('mongoose')
const { Schema, model } = mongoose
const crypto = require('crypto')
const uuid = require('uuid/v1')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true, //it removes extra spaces
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String, //used for password
  role:{type:Number,default:0},
 
  },
  { timestamps: true }, //whenever a new entry is created in this schema it will store its time in db
)

userSchema
  .virtual('password') //"password" is just a reference to the encry_password from the schema
  .set(function (password) {
    this._password = password
    this.salt = uuid()
    this.encry_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
}
//we should tell the mongoose that it is a part of collection
const User = model('User', userSchema) //User is name of the collection

module.exports = User
