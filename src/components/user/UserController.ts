import { Request, Response } from "express";
import { Register } from "../../service/auth/Register";
import { IUser } from "./IUserStructure";
import { findUserByGoogle } from "./UserMethod";
import User from "./User";
import { IResult } from "../../util/response";
import { result } from "../../response/result";
import Enterprise from "../enterprise/Enterprise";

export const all = async (
  req: Request,
  res: Response
): Promise<IResult | Response> => {
  try {
    const users = await User.find();

    return result(res, users);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const actives = async (
  req: Request,
  res: Response
): Promise<IResult | Response> => {
  try {
    const users = await User.find({isActive: true});

    return result(res, users);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, googleId } = req.body;

    const user = await findUserByGoogle(email, googleId);
    const enterprise = await Enterprise.findOne({userId: user._id});
    
    const hasEnterprise = enterprise != null;
    
    return result(res, {user, hasEnterprise});
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await new Register(req.body as IUser).save();
    return result(res, user);

  } catch (error: any) {
    return result(res, error.toString() , false);
  }
};


export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString());
  }
}
