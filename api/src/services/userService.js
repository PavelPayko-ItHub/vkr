const pool = require('../config/db')
const bcrypt = require("bcryptjs")

exports.checkIsUserExist = async (params) => {
  const { login } = params
  const isUserExist = await pool.query('SELECT 1 FROM users WHERE login=$1', [login]).rowCount

  return isUserExist
}

exports.getUserByLogin = async (params) => {
  const { login } = params
  const result = await pool.query('SELECT id, role, password, full_name FROM users WHERE login=$1', [login])

  return result
}

exports.getUserById = async (params) => {
  const { id } = params
  const result = await pool.query('SELECT id, role, login, full_name, phone, email FROM users WHERE id=$1', [id])

  return result
}

exports.getAllUsers = async () => {
  const result = await pool.query('SELECT created_at, email, full_name, id, login, phone, role FROM users')

  return result
}

exports.createUser = async (params) => {
  const { login, password, full_name, phone, email, role } = params
  const salt = await bcrypt.genSalt(10)
  const password_hash = await bcrypt.hash(password, salt)
  const result = await pool.query(
    `INSERT INTO users (login, password, full_name, phone, email, role)
      VALUES ($1, $2,$3, $4, $5,$6)
      RETURNING id, login, full_name, phone, email, role`,
    [login, password_hash, full_name, phone, email, role]
  )

  return result
}

exports.updateUser = async (params) => {
  const { full_name, email, phone, role, id } = params

  const result = await pool.query(
    'UPDATE users SET full_name=$1, email=$2, phone=$3, role=$4  WHERE id=$5 RETURNING *',
    [full_name, email, phone, role, id]
  )

  return result
}

exports.deleteUser = async (params) => {
  const { id } = params

  const result = await pool.query('DELETE FROM users WHERE id = $1', [id])

  return result
}