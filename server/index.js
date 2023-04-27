require("dotenv").config({ path: "./server/config/.env" });
const chalk = require("chalk");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    chalk.magentaBright.bold(
      `Server running in MODE: ${chalk.yellowBright.underline(
        process.env.NODE_ENV
      )} on PORT: ${chalk.yellowBright.underline(PORT)} 🔊🔊🔊...`
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
