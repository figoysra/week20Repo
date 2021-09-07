const db = require("../config/db");

const mastertransaksimodel = {
  getAllData: () =>
    new Promise((resolve, reject) => {
      db.query(
        `select inv.id as id, inv.idUser,
        us.email,us.displayname,
        inv.alamat, inv.payment_method, inv.subTotal, inv.tax, inv.shipping, inv.total  
            from mastertransaksi as inv left join tbl_users as us on inv.idUser=us.id`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  getList: (search, field, typeSort, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `select inv.id as id, inv.idUser,
        us.email,us.displayname,
        inv.alamat, inv.payment_method, inv.subTotal, inv.tax, inv.shipping, inv.total  
            from mastertransaksi as inv left join tbl_users as us on inv.idUser=us.id
            where inv.total LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset} `,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  //   getdetails: (id) =>
  //     new Promise((resolve, reject) => {
  //       db.query(
  //         `select pro.id as id, pro.productName,pro.photo,pro.price, pro.description, pro.categoryID, cat.category
  //             from tbl_products as pro left join tbl_category as cat on pro.categoryID=cat.id where pro.id='${id}'`,
  //         (err, result) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(result);
  //           }
  //         }
  //       );
  //     }),
    insert: (body) =>
      new Promise((resolve, reject) => {
        const { idUser, alamat, payment_method, subTotal, tax, shipping, total, details} = body;
        // console.log(details)
        db.query(
          `INSERT INTO mastertransaksi (idUser, alamat,payment_method, subTotal,tax, shipping, total) 
          value ('${idUser}','${alamat}','${payment_method}','${subTotal}',${tax},${shipping},${total})`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              // console.log(result.insertId);
              details.map((e)=>{
                return db.query(
                  `INSERT INTO detailtransaksi (idProduct, qty, price, idMaster)
                  value ('${e.idProduct}','${e.qty}','${e.price}','${result.insertId}')`,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(result);
                    }
                  }
                );
              })
              resolve(result)
            }
          }
        );
      }),
  //   update: (id, body) =>
  //     new Promise((resolve, reject) => {
  //       const { productName, photo, price, description, categoryID } = body;
  //       db.query(
  //         `UPDATE tbl_products SET productName ='${productName}',photo='${photo}',price='${price}', description='${description}', categoryID= ${categoryID} where id = ${id}`,
  //         (err, result) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(result);
  //           }
  //         }
  //       );
  //     }),
  //   destroy: (id) =>
  //     new Promise((resolve, reject) => {
  //       db.query(`DELETE FROM tbl_products WHERE id=${id}`, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       });
  //     }),
};

module.exports = mastertransaksimodel;
