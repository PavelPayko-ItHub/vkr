const pool = require('../config/db')
const bcrypt = require("bcryptjs")

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT created_at, email, full_name, id, login, phone, role FROM users')
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.createAdmin = async (req, res) => {
  // const { login, password, full_name, phone, email } = req.body
  const login = 'admin'
  const password = 'admin'
  const full_name = 'admin'
  const phone = 'admin'
  const email = 'admin'
  const role = 'admin'
  try {
    const isUserExist = await (await pool.query('SELECT 1 FROM users WHERE login=$1', [login])).rowCount

    if (isUserExist) {
      res.status(409).json({ error: 'Пользователь уже существует' })
    } else {
      const salt = await bcrypt.genSalt(10)
      const password_hash = await bcrypt.hash(password, salt)
      // const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
      const result = await pool.query(`INSERT INTO users (login, password, full_name, phone, email, role)
            VALUES ($1, $2,$3, $4, $5,$6)
            RETURNING id, login, full_name, phone, email, role
            `,
        [login, password_hash, full_name, phone, email, role])
      res.status(201).json(result.rows[0])
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.createUser = async (req, res) => {
  // const { login, password, full_name, phone, email } = req.body
  const login = req.body.login || ''
  const password = req.body.password || ''
  const full_name = req.body.full_name || ''
  const phone = req.body.phone || ''
  const email = req.body.email || ''
  const role = req.body.role || 'user'
  try {
    const isUserExist = await (await pool.query('SELECT 1 FROM users WHERE login=$1', [login])).rowCount

    if (isUserExist) {
      res.status(409).json({ error: 'Пользователь уже существует' })
    } else {
      const salt = await bcrypt.genSalt(10)
      const password_hash = await bcrypt.hash(password, salt)
      const result = await pool.query(`INSERT INTO users (login, password, full_name, phone, email, role)
            VALUES ($1, $2,$3, $4, $5,$6)
            RETURNING id, login, full_name, phone, email, role
            `,
        [login, password_hash, full_name, phone, email, role])
      res.status(201).json(result.rows[0])
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const full_name = req.body.full_name || ''
  const email = req.body.email || ''
  const phone = req.body.phone || ''
  const role = req.body.role || 'user'
  try {
    const result = await pool.query('UPDATE users SET full_name=$1, email=$2, phone=$3, role=$4  WHERE id=$5 RETURNING *',
      [full_name, email, phone, role, id]
    )
    res.status(200).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}