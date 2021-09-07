const { success, failed } = require("../helpers/response");
const detailtransaksimodel = require("../models/detailtransaksimodel")
const _ = require("lodash");
const redisAction = require("../helpers/redis");
const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1", // localhost
  port: 6379,
});
const detailtransaksi = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? "" : query.search;
      const field = query.field === undefined ? "us.displayname" : query.field;
      const typeSort = query.sort === undefined ? "ASC" : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get("detailtransaksi", (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          detailtransaksimodel
            .getList(search, field, typeSort, limit, offset)
            .then(async (data) => {
              const allData = await detailtransaksimodel.getAllData();
              const response = {
                data: data,
                totalPage: Math.ceil(allData.length / limit),
                search,
                limit,
                page,
              };
              redisAction.set("detailtransaksi", JSON.stringify(allData));
              success(res, response, "get all data success");
            })
            .catch((err) => {
              failed(res, 500, err);
            });
        } else {
          const response = JSON.parse(result);
          const dataFilter = _.filter(response, (e) =>
            e.displayname.includes(search)
          );
          const paginated = _.slice(dataFilter, offset, offset + limit);
          const output = {
            data: paginated,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, "success");
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getdetails: (req, res) => {
    try {
      const { id } = req.params;
      detailtransaksimodel
        .getdetails(id)
        .then((result) => {
          success(res, result, "get details data success");
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = detailtransaksi;
