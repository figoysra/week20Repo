const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const getToken = require("./helpers/getToken")
const fs = require("fs");

describe("Test Endpoint Products", () => {
  it("Test get /products", () => {
      request(app)
      .get("/products")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
          expect(res.body).to.be.a("object");
      })
      .catch((err) => {
          console.log(err);
      });
  })
  it('test post /products',() => {
      const filePath = `${__dirname}/helpers/image/image1.jpg`;
          fs.exists(filePath,(exists)=>{
              if(!exists){
                  console.log("Image tidak tersedia");
              }else{
                  getToken.admin().then((token)=>{
                      request(app)
                      .post("/products")
                      .set("token", token)
                      .field("productName", "Chicken Noodle")
                      .attach("photo", filePath)
                      .field("price", "25000")
                      .field("categoryID", "14")
                      .expect("Content-Type", /json/)
                      .expect(200)
                      .then((res) => {
                          expect(res.body).to.be.a("object"),
                          expect(res.body.data).to.have.haveOwnProperty("insertId");
                      })
                      .catch((err) => {
                      console.log(err);
                      });
                  })
              }
          })
  });
  it('test update /products',()=>{
      const filePath = `${__dirname}/helpers/image/image1.jpg`;
      fs.exists(filePath,(exists)=>{
          if(!exists){
              console.log("Image tidak tersedia");
          }else{
              getToken.admin().then((token)=>{
                  request(app)
                  .put("/products/44")
                  .set("token", token)
                  .field("productName", "Instant Noodle")
                  .attach("photo", filePath)
                  .field("price", "10000")
                  .field("categoryID", "14")
                  .expect("Content-Type", /json/)
                  .expect(200)
                  .then((res) => {
                      expect(res.body).to.be.a("object"),
                      expect(res.body.data).to.have.haveOwnProperty("affectedRows");
                  })
                  .catch((err) => {
                  console.log(err);
                  });
              })
          }
      })
  })
  it('test delete /product',()=>{
      getToken.admin().then((token)=>{
          request(app)
          .delete("/products/128")
          .set('token', token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
              expect(res.body).to.be.a("object");
              expect(res.body.data).to.have.haveOwnProperty("affectedRows");
          })
          .catch((err) => {
              console.log(err);
          });
      })
  })

  // Kondisi Error
  it("test post /products with error 401", () => {
    getToken.admin().then((token) => {
      request(app)
        .post("/products")
        .set("token", token)
        .expect("Content-Type", /json/)
        .expect(401)
        .then((res) => {
          expect(res.body).to.be.a("object");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it("test post /products with error 404 wrong field", () => {
    const filePath = `${__dirname}/helpers/image/image1.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log("Image tidak tersedia");
      } else {
        getToken.admin().then((token) => {
          request(app)
            .post("/products")
            .set("token", token)
            .field("productName", "Chicken Noodle")
            .attach("photo", filePath)
            .field("price", "25000")
            .field("categoryID", "1400")
            .expect("Content-Type", /json/)
            .expect(404)
            .then((res) => {
              expect(res.body).to.be.a("object");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  it("test update /products with error 401", () => {
    getToken.admin().then((token) => {
      request(app)
        .put("/products/9")
        .set("token", token)
        .expect("Content-Type", /json/)
        .expect(401)
        .then((res) => {
          expect(res.body).to.be.a("object");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it("test update /products with error 404", () => {
    const filePath = `${__dirname}/helpers/image/image1.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log("Image tidak tersedia");
      } else {
        getToken.admin().then((token) => {
          request(app)
            .put("/products/28")
            .set("token", token)
            .field("productName", "Instant Noodle")
            .attach("photo", filePath)
            .field("price", "10000")
            .field("categoryID", "14000")
            .expect("Content-Type", /json/)
            .expect(404)
            .then((res) => {
              expect(res.body).to.be.a("object");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
    it('test delete /product with 404 error wrong id',()=>{
        getToken.admin().then((token)=>{
            request(app)
            .delete("/products/013920")
            .set('token', token)
            .expect("Content-Type", /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).to.be.a("object");
            })
            .catch((err) => {
                console.log(err);
            });
        })
    })
    it("test post /products 401 error wrong extention file ", () => {
      const filePath = `${__dirname}/helpers/image/halo.txt`;
      fs.exists(filePath, (exists) => {
        if (!exists) {
          console.log("Image tidak tersedia");
        } else {
          getToken.admin().then((token) => {
            request(app)
              .post("/products")
              .set("token", token)
              .field("productName", "Chicken Noodle")
              .attach("photo", filePath)
              .field("price", "25000")
              .field("categoryID", "14")
              .expect("Content-Type", /json/)
              .expect(401)
              .then((res) => {
                expect(res.body).to.be.a("object")
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
    });
});
