import { Request, Response } from "express";
import { IProduct } from "./IProductStructure";
import Product from "./Product";

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
