const jwt = require('jsonwebtoken')
const User = require('../models/user')

// (POST) Verify
exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'secretKey', (err, decoded) => {
        User.findById(decoded.id)
        .exec()
        .then((result) => {
            if (!result) {
                return res.status(400).json({
                    status: false,
                    message: 'Token expired. Please login first'
                })
            }

            req.decoded = decoded
            next()
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: err.message
            })
        })
    })
}