import express, { Application } from "express";
import morgan from "morgan";
import env from "./config/env";
import mongoose from "./db/connection";
import apiRoutes from "./router/apiRoutes";
import cors from 'cors';
export const PROJECT_PATH = __dirname;

export class App {
  private app: Application;
  private port: string;

  constructor(port?: string) {
    this.app = express();
    this.port = port || env.PORT;
    this.middlewares();
    this.settings();
    this.router();
    mongoose;
  }
 
  getApp = () => this.app;

  middlewares = () => {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };

  settings = () => {
    this.app.set("port", this.port);
  };

  router = () => {
    this.app.use("/api/v1", apiRoutes);
  };

  start = async (): Promise<void> => {
    await this.app.listen(this.app.get("port"));
    console.log(`Listen on port ${this.app.get("port")}`);
  };
}
