import yargs from "yargs";
import { Component } from "./component";

yargs
  .command(
    "make:component",
    "make component",
    {
      name: {
        description: "Make a component build",
        alias: "n",
        type: "string",
      },
    },
    async ({ name }) => {
      console.log(name);
      if (name) {
        name.split(",").forEach(async (componentName) => {
          const builder = new Component(componentName);
          await builder.basicComponent();
          await builder.createRouter();
          console.log(`Component ${componentName} created successfully`);
        });
      }
    }
  )
  .help()
  .alias("help", "h").argv;
