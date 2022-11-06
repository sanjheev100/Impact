const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sendEmail = require('./sendEmail')
require('dotenv').config()

//server
const app = express()
const router = express.Router()

//middlewares
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors())

app.use(
  router.post('/api/sendEmail', async (req, res) => {
    try {
      const { name, email, phone, description } = req.body
      let messagecontent =
        'Hello User <br/>' +
        '<p>You Have received new request in antiquity from </p> <br/>' +
        '<strong>Name: </strong>' +
        name +
        '<br/>' +
        '<strong>email: </strong>' +
        email +
        '<br/>' +
        '<strong>Phone: </strong>' +
        phone +
        '<br/>' +
        '<strong>Description: </strong>' +
        description +
        '<br/>' +
        '<br/>' +
        '<br/>' +
        '<br/>'
      await sendEmail(
        email,
        'New Contact Request for Antiquity',
        messagecontent
      )
      return res.status(200).json({ message: 'Request Received' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })
)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`))
