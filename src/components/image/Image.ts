import mongoose, { Schema } from 'mongoose';
import { IImage } from './IImageStructure';

export const ImageSchema = new Schema<IImage>({
    url: {
        type: String, required: true
    },
    key:{
        type: String, required: true,
    }
}, { timestamps: true });

export default mongoose.model("Image", ImageSchema);