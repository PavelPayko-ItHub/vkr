const { checkIsUserExist, createUser, updateUser, deleteUser, getAllUsers } = require('../services/userService')

exports.getUsers = async (req, res) => {
  try {
    const result = await getAllUsers()

    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.createAdmin = async (req, res) => {
  const login = 'admin'
  const password = 'admin'
  const full_name = 'admin'
  const phone = 'admin'
  const email = 'admin'
  const role = 'admin'
  try {
    const isUserExist = await checkIsUserExist({ login })

    if (isUserExist) {
      res.status(409).json({ error: 'Администратор уже существует' })
    } else {
      const result = await createUser({ login, password, full_name, phone, email, role })

      res.status(201).json(result.rows[0])
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.createUser = async (req, res) => {
  const login = req.body.login || ''
  const password = req.body.password || ''
  const full_name = req.body.full_name || ''
  const phone = req.body.phone || ''
  const email = req.body.email || ''
  const role = req.body.role || 'user'
  try {
    const isUserExist = await checkIsUserExist({ login })

    if (isUserExist) {
      res.status(409).json({ error: 'Пользователь уже существует' })
    } else {
      const result = await createUser({ login, password, full_name, phone, email, role })

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
    const result = await updateUser({ id, full_name, email, phone, role })

    res.status(200).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteUser({ id })

    res.status(204).send(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}