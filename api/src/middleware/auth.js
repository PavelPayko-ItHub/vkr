const jwt = require("jsonwebtoken")
require('dotenv').config()

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) return res.status(401).send("Необходима авторизация")

  try {
    token = token.split(' ')[1] // Remove Bearer from string

    if (token === 'null' || !token) return res.status(401).send('Необходима авторизация')

    let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET)
    if (!verifiedUser) return res.status(401).send('Необходима авторизация')

    req.user = verifiedUser
    next()

  } catch (error) {
    console.log({ error })

    res.status(401).send("Токен невалиден")
  }
}

exports.isUser = async (req, res, next) => {
  if (req.user.role === 'user') {
    next()
  } else {
    return res.status(403).send(`Нет доступа у роли ${req.user.role}!`)
  }
}

exports.isAdmin = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {

    return res.status(403).send(`Нет доступа у роли ${req.user.role}!`)
  }
}