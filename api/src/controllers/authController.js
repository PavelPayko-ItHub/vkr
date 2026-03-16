const pool = require('../config/db')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { getUser, getUserByLogin, getUserById } = require('../services/userService')
const { getToken } = require('../services/authService')
// const config = require("../config/config")

// exports.login = async (req, res) => {
//   const { login, password } = req.body

//   const user = await pool.query('SELECT id, role, password, full_name FROM users WHERE login=$1', [login])
//   const isUserExist = user.rowCount

//   if (isUserExist) {
//     try {
//       const passHash = user.rows?.[0].password

//       const validPass = await bcrypt.compare(password, passHash)
//       if (!validPass) return res.status(401).json({ error: 'Логин или пароль введен неверно' })

//       let payload = { id: user.rows[0].id, role: user.rows[0].role }
//       const token = jwt.sign(payload, process.env.TOKEN_SECRET)

//       res.status(200).header("auth-token", token).json({ token, user: user.rows[0] })

//     } catch (err) {
//       console.error(err)

//       res.status(500).json({ error: err.message })
//     }
//   } else {
//     res.status(409).json({ error: 'Пользователь не существует' })
//   }
// }
exports.login = async (req, res) => {
  const { login, password } = req.body

  const user = await getUserByLogin({ login })
  const isUserExist = user.rowCount

  if (isUserExist) {
    try {
      const userPassHash = user.rows?.[0].password
      const userId = user.rows[0].id
      const userRole = user.rows[0].role
      const token = await getToken({ userId, userRole, userPassHash, password })

      if (token) {
        res.status(200).header("auth-token", token).json({ token, user: user.rows[0] })
      } else {
        res.status(401).json({ error: 'Логин или пароль введен неверно' })
      }

    } catch (err) {
      console.error(err)

      res.status(500).json({ error: err.message })
    }
  } else {
    res.status(409).json({ error: 'Пользователь не существует' })
  }
}

exports.auth_me = async (req, res) => {
  try {
    const { id } = req.user

    const result = await getUserById({ id })
    if (result.rowCount) {
      res.status(200).json(result.rows[0])
    } else {
      res.status(401).json({ error: 'Пользователь не авторизован' })
    }

  } catch (err) {
    console.error(err)

    res.status(500).json({ error: err.message })
  }

}