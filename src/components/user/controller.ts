import { Request, Response } from 'express';
import { Register } from '../auth/Register';
import { IUser } from './interface';
import { findUserByGoogle } from './method';
import User from './User';

export const all = async (req: Request, res: Response) => {
  try {
    return res.json(await User.find());
  } catch (error: any) {
    return res.json(error.toString());
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, googleId } = req.body;

    const user = await findUserByGoogle(email, googleId);

    return res.header('Authorization', `Bearer ${user.token}`).json(user);
  } catch (error: any) {
    return res.json(error.toString());
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await new Register(req.body as IUser).save();
    return res.header('Authorization', `Bearer ${user.token}`).json(user);
  } catch (error: any) {
    res.json(error.toString());
  }
};
