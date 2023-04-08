import { Schema, Types, model } from 'mongoose'

/**
 * Next_auth 에서 생성하는 collection
 */
const accountSchema = new Schema({
  compoundId: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true },
  providerType: { type: String, required: true },
  providerId: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refreshToken: String,
  accessToken: String,
  accessTokenExpires: Date,
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const Account = model('Account', accountSchema)
