import User from './User';

export const findUserByGoogle = async (email: string, googleId: string) => {
  const user = await User.findOne({ email, googleId });

  if (!user) throw new Error('User not found');

  return user;
};
