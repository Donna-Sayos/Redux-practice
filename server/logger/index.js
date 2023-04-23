const chalk = require("chalk");

// logs the method: GET PUT DELETE, protocol: http, host, and original url: the route/path
const logger = (req, res, next) => {
  console.log(
    chalk.magentaBright(
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}` // example: GET http://localhost:5000/api/v1/bootcamps
    )
  );
  next();
};

module.exports = logger;
