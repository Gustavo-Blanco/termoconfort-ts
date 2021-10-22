import mongoose, { Schema } from "mongoose";
import {ImageSchema} from "../image/Image";
import { IProduct } from "./IProductStructure";

const imageSchema = ImageSchema;


const ProductSchema = new Schema<IProduct>(
  {
    enterpriseId: {
      type: Schema.Types.ObjectId,
      ref: "Enterprise",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    energyConsume: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    install: {
      type: Boolean,
      required: true,
    },
    warranty: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
