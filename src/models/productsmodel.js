const db = require('../config/db');

const productsmodel = {
  getAllData: () => new Promise((resolve, reject) => {
    db.query('select * from tbl_products', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(`select pro.id as id, pro.productName,pro.picture, pro.sizepriceID, size.code, size.size, size.price, pro.description, pro.categoryID, cat.category 
            from tbl_products as pro left join sizeprice as size on pro.sizepriceID=size.id left join tbl_category as cat on pro.categoryID=cat.id
            where pro.productName LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset} `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getdetails: (id) => new Promise((resolve, reject) => {
    db.query(`select pro.id as id, pro.productName,pro.picture, pro.sizepriceID, size.code, size.size, size.price, pro.description, pro.categoryID, cat.category 
            from tbl_products as pro left join sizeprice as size on pro.sizepriceID=size.id left join tbl_category as cat on pro.categoryID=cat.id where pro.id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body) => new Promise((resolve, reject) => {
    const {
      productName, picture, sizepriceID, description, categoryID,
    } = body;
    db.query(`INSERT INTO tbl_products (productName,picture,sizepriceID,description,categoryID) value ('${productName}','${picture}','${sizepriceID}','${description}',${categoryID})`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  update: (id, body) => new Promise((resolve, reject) => {
    const {
      productName, picture, sizepriceID, description, categoryID,
    } = body;
    db.query(`UPDATE tbl_products SET productName ='${productName}',picture='${picture}',sizepriceID='${sizepriceID}',description='${description}', categoryID= ${categoryID} where id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  destroy: (id) => new Promise((resolve, reject) => {
    db.query(`DELETE FROM tbl_products WHERE id=${id}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),

};

module.exports = productsmodel;
