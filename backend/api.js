import { Router } from 'express'
const router = Router()
import { getFileData, setFileData } from './utils.js'

router.get('/users', async (req, res) => {
  try {
    const data = await getFileData()
    res.json(data)
  } catch {
    res.sendStatus(500)
  }
})

router.post('/users', async (req, res) => {
  const { name, email, gender, street, city, phone } = req.body

  try {
    const data = await getFileData()
    if (!name || !email || !gender || !street || !city || !phone) {
      res.sendStatus(400)
    }

    const ids = data.map(item => item.id)
    const maxId = Math.max(...ids)

    const createdUser = {
      id: maxId + 1,
      name,
      email,
      gender,
      address: {
        street,
        city
      },
      phone
    }

    data.push(createdUser)
    await setFileData(data)
    res.status(201).json(createdUser)
  } catch {
    res.sendStatus(500)
  }
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await getFileData()
    const index = data.findIndex(item => item.id === Number(id))

    if (index === -1) {
      res.sendStatus(404)
      return
    }

    data.splice(index, 1)
    await setFileData(data)
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, gender, street, city, phone } = req.body

  if (!name || !email || !gender || !street || !city || !phone) {
    res.sendStatus(400)
  }

  try {
    const data = await getFileData()
    const index = data.findIndex(item => item.id === Number(id))

    if (index === -1) {
      res.sendStatus(404)
      return
    }

    data[index] = {
      id: Number(id),
      name,
      email,
      gender,
      address: {
        street,
        city
      },
      phone
    }

    await setFileData(data)
    res.json(data[index])
  } catch (err) {
    res.sendStatus(500)
  }
})

export default router
