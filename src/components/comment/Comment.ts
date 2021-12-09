import mongoose, { Schema } from 'mongoose';
import { IComment } from './ICommentStructure';

const CommentSchema = new Schema<IComment>({
    text: {
        type: Schema.Types.String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);