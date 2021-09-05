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
        component?.split(",").forEach(async (name) => {
          const builder = new Component(name);
          await builder.writeFiles();
        });
      }
    }
  )
  .help()
  .alias("help", "h").argv;
