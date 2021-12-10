import mongoose, { Schema } from 'mongoose';
import { IComment } from './ICommentStructure';

export const CommentSchema = new Schema<IComment>({
    content: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: true
    }
}, { timestamps: true });



export default mongoose.model("Comment", CommentSchema);