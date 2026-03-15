const pool = require('../config/db')

exports.getAllPoints = async (params) => {
  const { role, user_id } = params
  if (role === 'admin') {
    const result = await pool.query(`
        SELECT points.id, points.user_id, u.login, u.full_name, points.type, points.description, points.status,
                points.created_at::text
        FROM points
        JOIN users u ON u.id = points.user_id
        WHERE u.login != 'admin'
        ORDER BY points.created_at DESC`
    )

    return result
  } else {
    const result = await pool.query(`
        SELECT id, user_id, type, description, status, created_at::text
        FROM points
        WHERE user_id=$1
        ORDER BY created_at DESC`,
      [user_id])

    return result
  }
}

exports.getUserPoints = async (params) => {
  const { user_id } = params

  const result = await pool.query(`
    SELECT id, user_id, type, description, status, deadline, created_at::text
    FROM points
    WHERE user_id=$1
    ORDER BY deadline ASC`,
    [user_id]
  )

  return result
}

exports.createPoint = async (params) => {
  const { user_id, type, description, deadline } = params

  const result = await pool.query(
    `INSERT INTO points (user_id, type, description, deadline)
      VALUES ($1,$2,$3,$4)
      RETURNING id, user_id, type, description, status,
                deadline::text, created_at::text`,
    [user_id, type, description, deadline]
  )

  return result
}

exports.updatePoint = async (params) => {
  const { pointId, description, type, deadline, status } = params

  const result = await pool.query(`
    UPDATE points 
    SET description=$2, type=$3, deadline=$4, status=$5
    WHERE id=$1`,
    [pointId, description, type, deadline, status])

  return result
}