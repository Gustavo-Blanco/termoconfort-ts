import mongoose, { Schema } from 'mongoose';
import { IAdmin } from './IAdminStructure';

const AdminSchema = new Schema<IAdmin>({}, { timestamps: true });

export default mongoose.model("Admin", AdminSchema);