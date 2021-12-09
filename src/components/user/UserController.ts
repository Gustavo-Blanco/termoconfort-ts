import { Request, Response } from "express";
import { Register } from "../../service/auth/Register";
import { IUser } from "./IUserStructure";
import { findUserByGoogle } from "./UserMethod";
import User from "./User";
import { IResult } from "../../util/response";
import { result } from "../../response/result";

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

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, googleId } = req.body;

    const user = await findUserByGoogle(email, googleId);

    return result(res, user);
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
