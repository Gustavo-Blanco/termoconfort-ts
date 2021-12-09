import { Request, Response } from "express";
import { Query } from "mongoose";
import { IProduct } from "./IProductStructure";
import Product from "./Product";
import { uploadManyFiles } from "../../service/Cloudinary";
import { IFilterStructure } from "../filterParams/IFilterStructure";

export const all = async (req: Request, res: Response) => {
  try {
    return res.json(await Product.find());
  } catch (error: any) {
    return res.json(error.toString());
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const productBody = req.body as IProduct;
    
    productBody.images = await uploadManyFiles(
      req.files as Express.Multer.File[],
      `ENTERPRISE_${productBody.enterpriseId}`
    );
    
    return res.json(productBody);
  } catch (error: any) {
    return res.json(error.toString());
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const productBody = req.body as IProduct;
    return res.json(
      await Product.findByIdAndUpdate(productBody._id, productBody, {
        new: true,
      })
    );
  } catch (error: any) {
    return res.json(error.toString());
  }
};

export const filter = async (req: Request, res: Response) => {
  try {
    const filterReq = req.body as IProduct;
    const query = req.query as IFilterStructure;

    const builder: Query<IProduct[], IProduct> = Product.find(filterReq);
    
    const defaultLimit = 10;
    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    builder.skip(skip)
    builder.limit(query.limit != null ? +query.limit! : defaultLimit);
    
    return res.json(await builder.exec());
  } catch (error: any) {
    return res.json(error.toString());
  }
};


export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    return res.json(await Product.findByIdAndRemove(id));
  } catch (error: any) {
    return res.json(error.toString());
  }
}