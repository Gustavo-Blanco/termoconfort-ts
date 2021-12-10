import { Request, Response } from 'express';
import { Query, Types } from 'mongoose';
import { result } from '../../response/result';
import { uploadOneImage } from '../../service/Cloudinary';
import { IFilterStructure } from '../filterParams/IFilterStructure';
import Enterprise from './Enterprise';
import { IEnterprise } from './IEnterpriseStructure';

export const all = async (req:Request,res: Response) => {
  try {
    const query = req.query as IFilterStructure;
        
    const defaultLimit = 10;
    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    const builder: Query<IEnterprise[], IEnterprise> = Enterprise.find({isActive: true});
    // builder.where({isActive: true})
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

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const enterprise = await Enterprise.findById(id);
    return result(res, enterprise);
  } catch (error: any) {
    return result(res, error.toString());
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const enterprise = await Enterprise.findByIdAndUpdate(id, {
      isActive: false
    }, {new: true});

    return result(res, enterprise);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
}

export const verifyEnterprise = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.userId!);

    const build = Enterprise.find()
    build.where({userId});
    const enterprises = await build.exec();
     
    return result(res, {hasEnterprise: enterprises.length != 0});
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
}
