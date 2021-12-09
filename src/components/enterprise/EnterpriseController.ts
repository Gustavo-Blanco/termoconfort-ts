import { Request, Response } from 'express';
import { Query } from 'mongoose';
import { result } from '../../response/result';
import { uploadOneImage } from '../../service/Cloudinary';
import { IFilterStructure } from '../filterParams/IFilterStructure';
import Enterprise from './Enterprise';
import { IEnterprise } from './IEnterpriseStructure';

export const all = async (req:Request,res: Response) => {
  try {
    const query = req.query as IFilterStructure;
        
    const builder: Query<IEnterprise[], IEnterprise> = Enterprise.find();
    const defaultLimit = 10;
    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    builder.skip(skip)
    builder.limit(query.limit != null ? +query.limit! : defaultLimit);
    
    return result(res ,await builder.exec());
  } catch (error: any) {
    return result(res, error.toString(), false);

  }
}

export const store = async (req:Request,res: Response) => {
  try {
    const body = req.body as IEnterprise;

    if (req.file) {
      const image = await uploadOneImage(req.file!, 'PROFILES');
      body.image = image.url;
      body.imageKey = image.public_id;
    }

    return result(res, await Enterprise.create(body));
    
  } catch (error:any) {
    return result(res, error.toString(), false);

  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    return result(res, await Enterprise.findByIdAndRemove(id));
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
}