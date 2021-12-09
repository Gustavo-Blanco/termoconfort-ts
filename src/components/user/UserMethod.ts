import { response } from 'express';
import { result } from '../../response/result';
import User from './User';


export const findUserByGoogle = async (email: string, googleId: string) => {
  const user = await User.findOne({ email, googleId });

  if (!user) throw result(response,'User not found', false);

  return user;
};
