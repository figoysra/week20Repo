const mastertransaksimodel = require("../models/mastertransaksimodel");
const { success, failed } = require("../helpers/response");
const _ = require("lodash");
const redisAction = require("../helpers/redis");
const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1", // localhost
  port: 6379,
});
const mastertransaksi = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? "" : query.search;
      const field = query.field === undefined ? "inv.alamat" : query.field;
      const typeSort = query.sort === undefined ? "ASC" : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const page = query.page === undefined ? 1 : query.page;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      client.get("invoice", (err, result) => {
        if (err) {
          failed(res, 401, err);
        } else if (!result) {
          mastertransaksimodel
            .getList(search, field, typeSort, limit, offset)
            .then(async (data) => {
              const allData = await mastertransaksimodel.getAllData();
              const response = {
                data: data,
                totalPage: Math.ceil(allData.length / limit),
                search,
                limit,
                page,
              };
              redisAction.set("invoice", JSON.stringify(allData));
              success(res, response, "get all data success");
            })
            .catch((err) => {
              failed(res, 500, err);
            });
        } else {
          const response = JSON.parse(result);
          const dataFilter = _.filter(response, (e) =>
            e.alamat.includes(search)
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
  //   getdetails: (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       productsmodel
  //         .getdetails(id)
  //         .then((result) => {
  //           success(res, result, "get details data success");
  //         })
  //         .catch((err) => {
  //           failed(res, 404, err);
  //         });
  //     } catch (error) {
  //       failed(res, 401, error);
  //     }
  //   },
    insert: (req, res) => {
      try {
        const { body } = req;
        mastertransaksimodel
          .insert(body)
          .then((result) => {
            client.del("invoice");
            success(res, result, "insert transaction success");
          })
          .catch((err) => {
            failed(res, 404, err);
          });
      } catch (error) {
        failed(res, 401, error);
        // res.json(error)
      }
    },
  //   update: (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { body } = req;
  //       productsmodel
  //         .update(id, body)
  //         .then((result) => {
  //           client.del("products");
  //           success(res, result, "update data success");
  //           // res.json(result)
  //         })
  //         .catch((err) => {
  //           failed(res, 404, err);
  //           // console.log(err)
  //         });
  //     } catch (error) {
  //       failed(res, 401, error);
  //       // res.json(error)
  //     }
  //   },
  //   destroy: (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       productsmodel
  //         .destroy(id)
  //         .then((result) => {
  //           client.del("products");
  //           success(res, result, "delete data success");
  //           // res.json(result)
  //         })
  //         .catch((error) => {
  //           failed(res, 404, error);
  //           // console.log(error)
  //         });
  //     } catch (error) {
  //       failed(res, 401, error);
  //     }
  //   },
  //   sendEmail: (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       productsmodel
  //         .getdetails(id)
  //         .then((result) => {
  //           sendEmail(req.query.email, result)
  //             .then((response) => {
  //               res.json(response);
  //             })
  //             .catch((err) => {
  //               res.json(err);
  //             });
  //         })
  //         .catch((err) => {
  //           failed(res, 404, err);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
};

module.exports = mastertransaksi;
