import yargs from "yargs";
import { Component } from "./component";

yargs
  .command(
    "make",
    "make diferent files",
    {
      component: {
        description: "Make a component build",
        alias: "c",
        type: "string",
      },
    },
    async ({ component }) => {
      if (component) {
        const builder = new Component(component);
        await builder.writeFiles();
      }
    }
  )
  .help()
  .alias("help", "h").argv;
