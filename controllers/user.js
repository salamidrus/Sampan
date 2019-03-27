const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// (GET) Test
exports.test = (req, res) => {
  return res.status(200).json({
    message: 'Welcome to sampan project'
  })
}

// (POST) Signup
exports.signup = (req, res) => {
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
    avatar: req.file ? req.file.filename : null,
    username: req.body.username,
    phone: req.body.phone,
    address: req.body.address
  })
  user.save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: result
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    })
}

// (POST) Login
exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    } else {
      if (!userInfo) {
        return res.status(400).json({
          message: 'User not found'
        })
      }

      bcrypt.compare(req.body.password, userInfo.password)
        .then((valid) => {
          if (!valid) {
            return res.status(400).json({
              success: false,
              message: 'Wrong Password'
            })
          }

          const token = jwt.sign({ id: userInfo._id }, 'secretKey', { expiresIn: '30d' })
          return res.status(200).json({
            success: true,
            message: token
          })
        })
        .catch(() => {
          return res.status(400).json({
            success: false,
            message: 'Password required to login'
          })
        })
    }
  })
}

// (PUT) Update Data User
exports.update = (req, res) => {
  let id = req.decoded.id
  
  User.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, userInfo) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    } else {
      if (!req.body.password) {
        return res.status(200).json({
          success: true,
          message: userInfo
        })
      }
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        req.body.password = hash
        userInfo.save((err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: err.message
            });
          }
          return res.status(201).json({
            success: true,
            message: "The corresponding user's information is successfully updated",
            data: userInfo
          });
        })
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      })
    }
  })
}

// (DELETE) Delete User
exports.delete = (req, res) => {
  let id = req.decoded.id

  User.findByIdAndDelete(id)
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Your Account has been Deleted!'
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: true,
        message: err.message
      })
    })
}

// (GET) Show Profil
exports.showProfil = (req, res) => {
  let id = req.decoded.id

  User.findById(id)
    .select('_id firstname lastname email avatar username phone address')
    .exec()
    .then(doc => {
      return res.status(200).json({
        success: true,
        message: 'Show user Profile',
        profile: doc
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    })
}
