import { Jwt } from '../../util/Jwt';
import { IUser } from '../user/interface';
import User from '../user/User';

export class Register {
  private userAttr: IUser;

  constructor(userAttr: IUser) {
    this.userAttr = userAttr;
  }
  
  save = async () => {
    this.userAttr.token = await new Jwt().create(this.userAttr);
    
    return await User.create(this.userAttr);
  };
}
