const request = require("supertest");
const app = require("../../app");

const getToken = {
  admin : () =>{
    return new Promise((resolve) => {
      request(app)
        .post("/login")
        .send({
          email: "admin",
          password: "admin",
        })
        .expect(200)
        .then((response) => {
          resolve(response.body.token);
        });
    });
  },
  user: () =>{
    return new Promise((resolve)=>{
      request(app)
      .post('/login')
      .send({
        email : "user",
        password : "user"
      })
      .then((res)=>{
        resolve(res.body.token)
      })
    })
  }
  
};
module.exports = getToken;
