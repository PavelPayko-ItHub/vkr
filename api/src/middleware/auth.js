const pool = require('../config/db')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config")

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) return res.status(401).send("Access Denied / Unauthorized request")

  try {
    token = token.split(' ')[1] // Remove Bearer from string

    if (token === 'null' || !token) return res.status(401).send('Unauthorized request')

    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET)   // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send('Unauthorized request')

    req.user = verifiedUser // user_id & user_type_id
    next()

  } catch (error) {
    res.status(400).send("Invalid Token")
  }

}

exports.isUser = async (req, res, next) => {
  console.log({ user: req.user })

  if (req.user.role === 'user') {
    next()
  } else {
    return res.status(403).send(`Forbidden for ${req.user.role}!`)
  }
}
exports.isAdmin = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    // return res.status(403).send("Unauthorized!")
    return res.status(403).json({ error: "Unauthorized" })
  }
}