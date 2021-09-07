const productsmodel = require("../models/productsmodel");
const { success, failed } = require("../helpers/response");
const _ = require("lodash");
const redisAction = require("../helpers/redis");
const sendEmail = require("../helpers/mail");
const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1", // localhost
  port: 6379,
});
const product = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? "" : query.search;
      const field = query.field === undefined ? "pro.id" : query.field;
      const typeSort = query.sort === undefined ? "ASC" : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get("products", (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          productsmodel
            .getList(search, field, typeSort, limit, offset)
            .then(async (data) => {
              const allData = await productsmodel.getAllData();
              const response = {
                data: data,
                totalPage: Math.ceil(allData.length / limit),
                search,
                limit,
                page,
              };
              redisAction.set("products", JSON.stringify(allData));
              success(res, response, "get all data success");
            })
            .catch((err) => {
              failed(res, 500, err);
            });
        } else {
          const response = JSON.parse(result);
          const dataFilter = _.filter(response, (e) =>
            e.productName.includes(search)
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
      productsmodel
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
  insert: (req, res) => {
    try {
      const { body } = req;
      productsmodel
        .insert(body)
        .then((result) => {
          client.del("products");
          success(res, result, "insert data success");
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      productsmodel
        .update(id, body)
        .then((result) => {
          client.del("products");
          success(res, result, "update data success");
          // res.json(result)
        })
        .catch((err) => {
          failed(res, 404, err);
          // console.log(err)
        });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  destroy: (req, res) => {
    try {
      const { id } = req.params;
      productsmodel
        .destroy(id)
        .then((result) => {
          client.del("products");
          success(res, result, "delete data success");
          // res.json(result)
        })
        .catch((error) => {
          failed(res, 404, error);
          // console.log(error)
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  sendEmail: (req, res) => {
    try {
      const { id } = req.params;
      productsmodel
        .getdetails(id)
        .then((result) => {
          sendEmail(req.query.email, result)
            .then((response) => {
              res.json(response);
            })
            .catch((err) => {
              res.json(err);
            });
        })
        .catch((err) => {
          failed(res, 404, err);
        });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = product;
