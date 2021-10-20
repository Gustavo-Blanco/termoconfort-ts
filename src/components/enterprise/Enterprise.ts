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
    social: [
      {type: Schema.Types.String},
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Enterprise', EnterpriseSchema);
