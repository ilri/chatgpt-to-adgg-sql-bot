const SwaggerExpress = require("swagger-express-mw");
const SwaggerUi = require("swagger-tools/middleware/swagger-ui");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3002;

const config = {
  appRoot: __dirname,
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  // install middleware
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  //   app.use(bodyParser.json());
  app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "1024mb" }));
  app.use(cors());

  swaggerExpress.register(app);
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
