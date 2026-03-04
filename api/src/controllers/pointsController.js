const pool = require('../config/db')
const bcrypt = require("bcryptjs")

exports.getPoints = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM points')
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
// user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
// type          TEXT NOT NULL,
// payload       JSONB NOT NULL DEFAULT '{}'::jsonb,
// status        request_status NOT NULL DEFAULT 'new',
// admin_comment TEXT,
// created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
// updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
exports.createPoint = async (req, res) => {
  const { id } = req.user
  const user_id = req.body.user_id || id
  const description = req.body.description
  const type = req.body.type || ''
  const deadline = req.body.deadline || ''
  try {
    const result = await pool.query(`INSERT INTO points (user_id, type, description, deadline)
                VALUES ($1,$2,$3,$4)
                RETURNING id, user_id, type, description, status,
                          deadline::text, created_at::text
            `,
      [user_id, type, description, deadline])
    res.status(201).json(result.rows[0])

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }

}

exports.getPoints = async (req, res) => {
  const { id: user_id, role } = req.user
  console.log('getPoints')

  try {
    if (role === 'admin') {
      const result = await pool.query(`
        SELECT points.id, points.user_id, u.login, u.full_name, points.type, points.description, points.status,
                points.created_at::text
        FROM points
        JOIN users u ON u.id = points.user_id
        WHERE u.login != 'admin'
        ORDER BY points.created_at DESC`
      )
      res.status(200).json(result.rows)
    } else {
      const result = await pool.query(`
        SELECT id, user_id, type, description, status, created_at::text
        FROM points
        WHERE user_id=$1
        ORDER BY created_at DESC`,
        [user_id])
      res.status(200).json(result.rows)
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUserPoints = async (req, res) => {
  const { userId: user_id } = req.params
  console.log('getUserPoints', { user_id })

  try {
    const result = await pool.query(`
        SELECT id, user_id, type, description, status, deadline, created_at::text
        FROM points
        WHERE user_id=$1
        ORDER BY deadline ASC`,
      [user_id])
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

  console.log('updatePoint', { pointId, body: req.body })


  try {
    const result = await pool.query(`
        UPDATE points 
        SET description=$2, type=$3, deadline=$4, status=$5
        WHERE id=$1
      `,
      [pointId, description, type, deadline, status])
    res.status(201).json(result.rows[0])

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// exports.getRequests = async (req, res) => {
//   const { id: user_id, role } = req.user
//   const page = parseInt(req.query.page, 10) || 1
//   const limit = parseInt(req.query.limit, 10) || 10
//   const offset = (page - 1) * limit

//   try {
//     if (role === 'admin') {
//       const result = await pool.query(`
//         SELECT req.id, req.user_id, u.login, req.type, req.content, req.status,
//                 req.comment, req.created_at::text
//         FROM requests req
//         JOIN users u ON u.id = req.user_id
//         ORDER BY req.created_at DESC`
//       )
//       res.status(200).json(result.rows)
//     } else {
//       const result = await pool.query(`
//         SELECT id, user_id, type, content, status, comment, created_at::text
//         FROM requests
//         WHERE user_id=$1
//         ORDER BY created_at DESC`,
//         [user_id])
//       res.status(200).json(result.rows)
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

exports.createFeedback = async (req, res) => {
  const { reqId: request_id } = req.params
  const { id: user_id } = req.user
  const content = req.body.content

  console.log({ request_id, user_id, params: req.params })

  try {
    const result = await pool.query(`
      INSERT INTO feedback (request_id, user_id, content)
                    VALUES ($1,$2,$3)
                    RETURNING id, request_id, user_id, content, created_at::text
            `,
      [request_id, user_id, content])
    res.status(201).json(result.rows[0])

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getFeedback = async (req, res) => {
  const { reqId: request_id } = req.params
  const { id: user_id } = req.user

  console.log({ request_id, user_id, params: req.params })

  try {
    const result = await pool.query(`
        SELECT content
        FROM feedback
        WHERE request_id=$1 AND user_id=$2
      `,
      [request_id, user_id])
    res.status(201).json(result.rows[0])

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }

}

exports.updateStatus = async (req, res) => {
  const { reqId: request_id } = req.params
  const { status } = req.body

  console.log('updateStatus', { request_id, status })


  try {
    const result = await pool.query(`
        UPDATE requests SET status=$1 WHERE id=$2
      `,
      [status, request_id])
    res.status(201).json(result.rows[0])

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}