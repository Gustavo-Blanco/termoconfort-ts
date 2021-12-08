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
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    capacity: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    energyConsume: {
      type: String,
      required: false,
    },
    images: [imageSchema],
    install: {
      type: Boolean,
      required: false,
    },
    warranty: {
      type: Boolean,
      required: false,
    },
    stock: {
      type: Number,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    description:{
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
