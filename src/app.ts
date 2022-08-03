import express from "express";

const app = express();

require("./Startup/routes")(app);
require("./Startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});
