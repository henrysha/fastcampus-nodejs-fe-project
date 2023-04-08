import mongoose from 'mongoose'
import { Menu } from '../models/menu'
import { Review } from '../models/review'
import { Store } from '../models/store'
import { User } from '../models/user'
import { connectToDB } from '../mongoClient'
;(async () => {
  await connectToDB()
  await Store.deleteMany()
  await User.deleteMany()
  await Review.deleteMany()
  await Menu.deleteMany()

  console.log('Cleared DB')

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
})()
