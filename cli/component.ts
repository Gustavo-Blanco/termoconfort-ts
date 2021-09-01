import fs from "fs/promises";
import path from "path";

const componentsPath = path.join("src", "components");

export class Component {
    
  constructor(private name: string) {}

  writeFiles = async (): Promise<void> => {
    try {
      await fs.mkdir(path.join(componentsPath, this.name.toLowerCase()));
      await fs.writeFile(
        path.join(componentsPath, this.name.toLowerCase(), this.name + ".ts"),
        this.modelContent()
      );
      await fs.writeFile(
        path.join(componentsPath, this.name.toLowerCase(), "interface.ts"),
        this.interfaceContent()
      );
      console.log("Component build successfully");
    } catch (error) {
      console.log("File or directory already exists");
    }
  };

  interfaceContent = (): string => {
    return `export interface I${this.name} {
    
}`;
  };

  modelContent = (): string => {
    return `import mongoose, { Schema } from "mongoose";
import { I${this.name} } from "./interface";
        
const ${this.name}Schema = new Schema<I${this.name}>({}, { timestamps: true });
        
export default mongoose.model("${this.name}", ${this.name}Schema);`;
  };
}
