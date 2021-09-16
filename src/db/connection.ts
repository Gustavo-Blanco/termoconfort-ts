import mongoose from "mongoose";
import env from "../config/env";

mongoose
  .connect(`mongodb://localhost:${env.DB_HOST}/marketplace`)
  // .then((db) => db.set("debug", true))
  .then((db) => console.log("Connected to database on port " + env.DB_HOST))
  .catch((error) => console.log("Error database " + error));


export default mongoose;
