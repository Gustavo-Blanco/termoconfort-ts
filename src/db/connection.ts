import mongoose from "mongoose";
import env from "../config/env";

mongoose
  .connect(env.DB_CONNECTION_URL)
  .then((db) => db.set("debug", true))
  .then((db) => console.log("Connected to database on port " + env.DB_HOST_PORT))
  .catch((error) => console.log("Error database " + error));


export default mongoose;
