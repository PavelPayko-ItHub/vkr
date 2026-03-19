const { getAllPoints, createPoint, getUserPoints, updatePoint } = require("../services/pointService")

// exports.getPoints = async (req, res) => {
//   try {
//     const result = await getAllPoints()

//     res.status(200).json(result.rows)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

exports.createPoint = async (req, res) => {
  const { id } = req.user
  const user_id = req.body.user_id || id
  const description = req.body.description
  const type = req.body.type || ''
  const deadline = req.body.deadline || ''
  try {
    const result = await createPoint({ user_id, description, type, deadline })

    res.status(201).json(result.rows[0])

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }

}

exports.getPoints = async (req, res) => {
  const { id: user_id, role } = req.user


  try {
    const result = await getAllPoints({ user_id, role })

    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUserPoints = async (req, res) => {
  const { userId: user_id } = req.params

  try {
    const result = await getUserPoints({ user_id })

    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updatePoint = async (req, res) => {
  const { pointId } = req.params
  const description = req.body.description
  const type = req.body.type || ''
  const deadline = req.body.deadline || ''
  const status = req.body.status || ''

  try {
    const result = await updatePoint({ pointId, description, type, deadline, status })

    res.status(201).json(result.rows[0])
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}