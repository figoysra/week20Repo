const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const getToken = require("./helpers/getToken");


describe("Test endpoint myInv ", () => {
    it("test get myinv /myinv", () => {
        getToken.admin().then((token)=>{
            request(app)
                .get("/myinv") //  endPoint yang akan di check
                .set("token", token)
                .expect("Content-Type", /json/) //ekspetasi response json
                .expect(200)
                .then((response) => {
                    expect(response.body).to.be.a("object"); //ekspetasi response object
                })
                .catch((err) => {
                    console.log(err);
                });
        }) 
    });
})