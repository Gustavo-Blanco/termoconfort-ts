import mongoose, { Schema } from "mongoose";
import { IUser } from "./interface";
        
const UserSchema = new Schema<IUser>({}, { timestamps: true });
        
export default mongoose.model("User", UserSchema);