require("dotenv").config({ path: "./config/.env" });
const chalk = require("chalk");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    chalk.cyanBright(
      `Server running in ${chalk.blueBright(
        process.env.NODE_ENV
      )} mode on PORT: ${chalk.blueBright(PORT)} 🔊🔊🔊`
    )
  );
});

process.on("unhandledRejection", (err) => {
  console.log(chalk.redBright(`Error: ${err.message}`));
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1); // 1 is for unhandled rejection
  });
});
