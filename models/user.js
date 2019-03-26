const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstname: {
    type: String,
    lowercase: true,
    match: [/^[a-zA-Z]/, 'Alphabet only'], // Letter Only
    required: [true, 'Name is required']
  },
  lastname: {
    type: String,
    lowercase: true,
    match: [/^[a-zA-Z]/, 'Alphabet only'], // Letter Only
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum Character 6'],
    maxlength: [14, 'Maximum Character 14'],
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    match: [/\S+@\S+\.\S+/],
    lowercase: true,
    required: [true, 'Email is required']
  },
  avatar: {
    type: String,
    required: false
  },
  username: {
    type: String,
    lowercase: true,
    unique: [true, 'Username already exists'],
    required: [true, 'Username is required']
  },
  phone: {
    type: Number,
    match: [0-9], // Number Only
    unique: [true, 'Phone already exists'],
    required: [true, 'Phone is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  tokenId: [{
    type: Schema.Types.ObjectId,
    ref: 'Token'
  }],
  cityId: [{
    type: Schema.Types.ObjectId,
    ref: 'City'
  }]
},
  { timestamps: true }
)

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be Unique' })

userSchema.pre('save', async function (next) {
  const saltRounds = 10
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

module.exports = mongoose.model('User', userSchema)
