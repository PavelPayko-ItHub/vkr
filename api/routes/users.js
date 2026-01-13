var express = require('express')
var router = express.Router()

const MongoClient = require("mongodb").MongoClient

const url = "mongodb://127.0.0.1:27017/"
const mongoClient = new MongoClient(url)


/* GET users listing. */
router
  .get('/', async (req, res, next) => {
    const collection = req.app.locals.collection
    try {
      const users = await collection.find({}).toArray()
      console.log('users', users)
      // res.send(users.map(user => user.userId))
      res.send(users.map(({ name, userId }) => ({ name, userId })))
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
    // res.send('respond with a resource');
  })
  .get('/:userId', async (req, res, next) => {
    // const collection = req.app.locals.collection
    try {
      // const id = new objectId(req.params.id)

      const id = req.params.userId
      console.log({ id, params: req.params })

      await mongoClient.connect()
      const db = mongoClient.db("usersdb")
      const collection = db.collection("users")
      // const result = await collection.findOne({ name: "Tom" })

      const user = await collection.findOne({ userId: Number(id) })
      console.log({ user })

      if (user) res.send(user)
      else res.sendStatus(404)
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
    // res.send('respond with a resource');
  })

module.exports = router
