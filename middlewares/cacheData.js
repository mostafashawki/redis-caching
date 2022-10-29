const redisClient = require("../redisClient");
module.exports = async function (req, res, next) {
  const completed = req.params.completed;
  let results;
  try {
    const cacheResults = await redisClient.get(`todos/${completed}`);
    if (cacheResults) {
      console.log("<<<Result from cache>>>");
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
