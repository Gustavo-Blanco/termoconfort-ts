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
      router: {
        description: "Make a router in component",
        alias: "r",
        type: "boolean"
      }
    },
    async ({ name,router }) => {
      if (name) {
        name.split(",").forEach(async (componentName) => {
          const builder = new Component(componentName);
          await builder.basicComponent();
          if (router) {
            await builder.createRouter();
          }
          console.log(`Component ${componentName} created successfully`);
        });
      }
    }
  )
  .help()
  .alias("help", "h").argv;
