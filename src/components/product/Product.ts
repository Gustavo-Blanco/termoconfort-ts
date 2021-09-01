import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interface";
        
const ProductSchema = new Schema<IProduct>({}, { timestamps: true });
        
export default mongoose.model("Product", ProductSchema);