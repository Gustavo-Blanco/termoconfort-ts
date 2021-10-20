import { Request, Response } from 'express';
import Enterprise from './Enterprise';
import { IEnterprise } from './IEnterpriseStructure';

export const all = async (req:Request,res: Response) => {
  try {
    res.json(await Enterprise.find());
  } catch (error: any) {
    res.json(error.toString());
  }
}

export const store = async (req:Request,res: Response) => {
  try {
    res.json(await Enterprise.create(req.body as IEnterprise));
  } catch (error:any) {
    res.json(error.toString());
  }
}