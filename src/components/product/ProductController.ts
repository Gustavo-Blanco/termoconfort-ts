import { Request, Response } from "express";
import { Query, Types } from "mongoose";
import { IProduct } from "./IProductStructure";
import Product from "./Product";
import { uploadManyFiles } from "../../service/Cloudinary";
import { IFilterStructure } from "../filterParams/IFilterStructure";
import { result } from "../../response/result";

export const all = async (req: Request, res: Response) => {
  try {
    return result(res, await Product.find({isActive: true}));
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const productBody = req.body as IProduct;

    if (!req.files) throw result(res, "There are not files to save");

    productBody.images = await uploadManyFiles(
      req.files as Express.Multer.File[],
      `ENTERPRISE_${productBody.enterpriseId}`
    );

    return result(res, await Product.create(productBody));
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const productBody = req.body as IProduct;
    return result(
      res,
      await Product.findByIdAndUpdate(productBody._id, productBody, {
        new: true,
      })
    );
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const filter = async (req: Request, res: Response) => {
  try {
    const filterReq = req.body as IProduct;
    filterReq.isActive = true;
    const query = req.query as IFilterStructure;
    
    const builder: Query<IProduct[], IProduct> = Product.find(filterReq);

    const defaultLimit = 10;
    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    builder.skip(skip);
    builder.limit(query.limit != null ? +query.limit! : defaultLimit);

    return result(res, await builder.exec());
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const byEnterprise = async (req: Request, res: Response) => {
  try {
    const query = req.query as IFilterStructure;
    const enterpriseId = new Types.ObjectId(req.params.enterpriseId);
    const defaultLimit = 10;
    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    const limit = query.limit != null ? +query.limit! : defaultLimit;
    
    const builder: Query<IProduct[], IProduct> = Product.find({isActive: true});
    builder.where({enterpriseId});
    builder.skip(skip);
    builder.limit(limit);

    return result(res, await builder.exec());
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};


export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const builder: Query<IProduct, IProduct> = Product.findById(id);
    builder.populate("images");
    builder.populate("enterpriseId");
    const post = await builder.exec();
    return result(res, post);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const product = await Product.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );

    return result(res,product);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};
