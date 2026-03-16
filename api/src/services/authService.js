const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()

exports.getToken = async (params) => {
  const { userId, userRole, userPassHash, password } = params

  const validPass = await bcrypt.compare(password, userPassHash)

  if (!validPass) return null

  let payload = { id: userId, role: userRole }
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)

  return token
}
