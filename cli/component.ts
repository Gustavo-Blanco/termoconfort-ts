import fs from "fs/promises";
import path from "path";
import {paths} from '../src/config/paths';
import {Cmodel,Crouter,Istructure} from './content';
export class Component {

  DIR_PATH : string;
  MODEL_PATH: string;
  STRUCTURE_PATH: string;
  ROUTER_PATH: string;

  constructor(private name: string) {
    this.DIR_PATH = path.join(paths.component,name.toLowerCase());
    this.MODEL_PATH = path.join(this.DIR_PATH,`${this.name}.ts`);
    this.STRUCTURE_PATH = path.join(this.DIR_PATH,`I${this.name}Structure.ts`);
    this.ROUTER_PATH = path.join(this.DIR_PATH,`${this.name}Route.ts`);
  }

  basicComponent = async (): Promise<void> => {
    try {
      await fs.mkdir(this.DIR_PATH);
      await fs.writeFile(this.STRUCTURE_PATH,Istructure(this.name));
      await fs.writeFile(this.MODEL_PATH,Cmodel(this.name));
    } catch (error:any) {
      console.log("File or directory already exists");
    }
  };

  createRouter = async (): Promise<void> => {
    try {
      await fs.writeFile(this.ROUTER_PATH,Crouter);
    } catch (error:any) {
      console.log('There was an error: '+error.toString());
    }
  }

}
