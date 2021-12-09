import { Request, Response } from 'express';
import { Query } from 'mongoose';
import { uploadImage } from '../../service/Cloudinary';
import { removeImages } from '../../service/ManageImage';
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
    
    return res.json(await builder.exec());
  } catch (error: any) {
    return res.json(error.toString());
  }
}

export const store = async (req:Request,res: Response) => {
  try {
    const body = req.body as IEnterprise;

    if (req.file) {
      const image = await uploadImage(req.file.path, 'PROFILES');
      body.image = image.url;
      body.imageKey = image.public_id;
      await removeImages([req.file.path]);
    }

    return res.json(await Enterprise.create(body));
    
  } catch (error:any) {
    return res.json(error.toString());
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    return res.json(await Enterprise.findByIdAndRemove(id));
  } catch (error: any) {
    return res.json(error.toString());
  }
}