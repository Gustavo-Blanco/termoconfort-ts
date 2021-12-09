import mongoose, { Schema } from 'mongoose';
import { IPost } from './IPostStructure';
import {CommentSchema} from '../comment/Comment';

const commentSchema = CommentSchema;
const PostSchema = new Schema<IPost>({
    title: {
        type: Schema.Types.String,
        required: true
    },
    content: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    comments: [commentSchema]
}, { timestamps: true });


export default mongoose.model("Post", PostSchema);