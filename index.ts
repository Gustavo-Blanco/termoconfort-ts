import { App } from "./src/app";

const main = async () => {
    const app = new App();
    await app.start();
}

main();