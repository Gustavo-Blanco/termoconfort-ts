import { Request, Response } from "express";
import { Query, QueryCursor } from "mongoose";
import { IProduct } from "./IProductStructure";
import Product from "./Product";
import { getPaths, removeImages } from "../../service/ManageImage";
import { formatUploadedImages } from "../../service/Cloudinary";

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
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const paths = getPaths(files);
    
    productBody.images = await formatUploadedImages(
      paths,
      `ENTERPRISE_${productBody.enterpriseId}`
    );
    await removeImages(paths);
    return res.json(await Product.create(productBody));
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

    const builder: Query<IProduct[], IProduct> = Product.find(filterReq);
    builder.limit(3);
    return res.json(await builder.exec());
  } catch (error: any) {
    return res.json(error.toString());
  }
};
