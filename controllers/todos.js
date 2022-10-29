const axios = require("axios");
const redisClient = require("../redisClient");
exports.todos_get = async (req, res, next) => {
  const completed = req.params.completed;
  let results;

  try {
    results = await fetchApiData(completed);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(`todos/${completed}`, JSON.stringify(results), {
      EX: 120, //refresh cache every 2 minutes
      NX: true,
    });

    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

async function fetchApiData(completed) {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/todos?completed=${completed}`
  );
  console.log("------Result from Server-----");
  return apiResponse.data;
}
