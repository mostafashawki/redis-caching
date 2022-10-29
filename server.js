const express = require("express");
const TodosController = require("./controllers/todos");
const cacheData = require("./middlewares/cacheData");

const app = express();
const port = process.env.PORT || 3000;

app.get("/todos/:completed", cacheData, TodosController.todos_get);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
