import mongoose, { Schema } from 'mongoose';
import { IPost } from './IPostStructure';

const PostSchema = new Schema<IPost>({}, { timestamps: true });

export default mongoose.model("Post", PostSchema);