const sizepricemodel = require('../models/sizepricemodel');
const { success, failed } = require('../helpers/response');

const sizeprice = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? 'ASC' : query.sort;
      const limit = query.limit === undefined ? 10 : query.limit;
      const offset = query.page === undefined || query.page === 1 ? 0 : (query.page - 1) * limit;
      sizepricemodel.getList(search, field, typeSort, limit, offset).then(async (result) => {
        const alldata = await sizepricemodel.getAllData();
        const response = {
          data: result,
          totalPage: Math.ceil(alldata.length / limit),
          page: req.query.page,
        };
        success(res, response, 'success');
      }).catch((err) => {
        failed(res, 404, err);
        // console.log(err)
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  getdetails: (req, res) => {
    try {
      const { id } = req.params;
      sizepricemodel.getdetails(id).then((result) => {
        success(res, result, 'success');
        // res.json(result)
      }).catch((err) => {
        failed(res, 404, err);
        // console.log(err)
      });
    } catch (error) {
      failed(res, 401, error);
      // res.json(error)
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      sizepricemodel.insert(body).then((result) => {
        success(res, result, 'success');
        // res.json(result)
      }).catch((err) => {
        failed(res, 404, err);
        // console.log(err)
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
      sizepricemodel.update(id, body).then((result) => {
        success(res, result, 'success');
        // res.json(result)
      }).catch((err) => {
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
      sizepricemodel.destroy(id).then((result) => {
        success(res, result, 'success');
        // res.json(result)
      }).catch((error) => {
        failed(res, 404, error);
        // console.log(error)
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};
module.exports = sizeprice;
