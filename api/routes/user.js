var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get(':userId', async (req, res, next) => {
  const collection = req.app.locals.collection
  try {
    // const id = new objectId(req.params.id)
    const id = req.params.id
    console.log({ id, params: req.params })

    const user = await collection.findOne({ userId: id })

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
