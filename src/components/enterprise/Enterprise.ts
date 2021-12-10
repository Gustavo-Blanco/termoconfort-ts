import mongoose, { Schema } from 'mongoose';
import { IEnterprise } from './IEnterpriseStructure';

const EnterpriseSchema = new Schema<IEnterprise>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
    },
    link: {
      type: Schema.Types.String,
    },
    workers: {
      type: Schema.Types.Number,
    },
    linkedin: {
      type: Schema.Types.String,
      required: false
    },
    facebook: {
      type: Schema.Types.String,
      required: false
    },
    twitter: {
      type: Schema.Types.String,
      required: false
    },
    instagram: {
      type: Schema.Types.String,
      required: false
    },
    youtube: {
      type: Schema.Types.String,
      required: false
    },
    webPage: {
      type: Schema.Types.String,
      required: false
    },
    imageKey: {
      type: Schema.Types.String,
      required: false
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: true,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Enterprise', EnterpriseSchema);
