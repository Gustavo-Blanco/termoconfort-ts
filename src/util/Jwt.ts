import jwt from 'jsonwebtoken';
import env from '../config/env';

export class Jwt{

  create = async (object:any): Promise<string> => {
    return await jwt.sign({object},env.JWT_TOKEN);
  }

  

};