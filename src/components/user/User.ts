import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from './IUserStructure';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
