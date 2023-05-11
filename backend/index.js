import express from 'express'
import cors from 'cors'
import api from './api.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/api', api)

app.listen(port, () => {
  console.log(`The server has started on port ${port}...`)
})
