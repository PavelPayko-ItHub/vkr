const express = require('express')
const pool = require('./src/config/db')
const routes = require('./src/routes')
const fs = require('fs').promises
var cors = require('cors')
// const { body, validationResult } = require('express-validator')


const app = express()

app.use(express.json())
app.use(cors())

app.post('/users',
  // body('email').isEmail(),
  // body('name').notEmpty(),
  (req, res, next) => {
    // const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  routes
)

app.use('/api', routes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})