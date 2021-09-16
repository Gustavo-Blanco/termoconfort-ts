export const Istructure = (name:string): string =>
`export interface I${name} {

}`;

export const Cmodel = (name: string): string =>
`import mongoose, { Schema } from 'mongoose';
import { I${name} } from './I${name}Structure';

const ${name}Schema = new Schema<I${name}>({}, { timestamps: true });

export default mongoose.model("${name}", ${name}Schema);`;

export const Crouter =
`import { Router } from 'express';

const router: Router = Router();

export default router;
`;