import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { connectToDB } from '@/db/mongoClient'
import imageRouter from '@/routes/image'
import menuRouter from '@/routes/menu'
import orderRouter from '@/routes/order'
import reviewRouter from '@/routes/review'
import storeRouter from '@/routes/store'
import userRouter from '@/routes/user'

dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/menu', menuRouter)
app.use('/order', orderRouter)
app.use('/review', reviewRouter)
app.use('/store', storeRouter)
app.use('/image', imageRouter)
app.use('/user', userRouter)

connectToDB()

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`)
})
