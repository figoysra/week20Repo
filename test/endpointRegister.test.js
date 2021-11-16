const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const fs = require("fs");

describe("Test endpoint Register", () => { 
    it("test post /users", () => {
      const filePath = `${__dirname}/helpers/image/image1.jpg`;
      fs.exists(filePath, (exists) => {
        if (!exists) {
          console.log("Image tidak tersedia");
        } else {
          request(app)
            .post("/register")
            .field("email", "userpalingterbaruuuuu999@gmail.com")
            .field("password", "admin")
            .attach("photo", filePath)
            .field("phone", "62812")
            .field("admin", "0")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
              expect(response.body).to.be.a("object");
              expect(response.body.data).to.have.property("insertId");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });

    //kondisi error

    it("test post /users with 401 error same data in email", () => {
      const filePath = `${__dirname}/helpers/image/image1.jpg`;
      fs.exists(filePath, (exists) => {
        if (!exists) {
          console.log("Image tidak tersedia");
        } else {
          request(app)
            .post("/register")
            .field("email", "admin")
            .field("password", "admin")
            .attach("photo", filePath)
            .field("phone", "62812")
            .field("admin", "0")
            .expect("Content-Type", /json/)
            .expect(401)
            .then((response) => {
              expect(response.body).to.be.a("object");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
    it("test post /users with 401 error bycrypt", () => {
      const filePath = `${__dirname}/helpers/image/image1.jpg`;
      fs.exists(filePath, (exists) => {
        if (!exists) {
          console.log("Image tidak tersedia");
        } else {
          request(app)
            .post("/register")
            .field("email", "adminidfis")
            .attach("photo", filePath)
            .field("phone", "62812")
            .field("admin", "0")
            .expect("Content-Type", /json/)
            .expect(401)
            .then((response) => {
              expect(response.body).to.be.a("object");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
    it("test post /users with 404 error cannot insert data", () => {
      const filePath = `${__dirname}/helpers/image/image1.jpg`;
      fs.exists(filePath, (exists) => {
        if (!exists) {
          console.log("Image tidak tersedia");
        } else {
          request(app)
            .post("/register")
            .field("email", "admin83827392")
            .field("password","admin")
            .attach("photo", filePath)
            .expect(404)
            .expect("Content-Type", /json/)
            .then((response) => {
              expect(response.body).to.be.a("object");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
})
