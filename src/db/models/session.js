import { Schema, model } from 'mongoose';

const sessionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: String, required: true },
    refreshTokenValidUntil: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionsCollection = model('session', sessionsSchema);
