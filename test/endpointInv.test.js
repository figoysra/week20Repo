const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const getToken = require("./helpers/getToken");

describe("Test endpoint INV ", () => {
    it("test get all /inv", () => {
        getToken.admin().then((token)=>{
            request(app)
                .get("/inv") //  endPoint yang akan di check
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
    it("test insert Inv /inv", () => {
        getToken.admin().then((token)=>{
            request(app)
                .post("/inv") //  endPoint yang akan di check
                .set("token", token)
                .send({
                        "alamat": "menteng",
                        "payment_method": "Cash",
                        "subTotal": "61000",
                        "tax": 6000,
                        "shipping": 1,
                        "total": 67000,
                        "details" : [{
                            "idProduct" : 2,
                            "qty" : 1,
                            "price": 36000
                        },{
                            "idProduct" : 11,
                            "qty" : 1,
                            "price": 25000}
                        ]
                })
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

    // kondisi error

    it("test insert Inv /inv with 404 error wrong field", () => {
        getToken.admin().then((token)=>{
            request(app)
                .post("/inv") //  endPoint yang akan di check
                .set("token", token)
                .expect("Content-Type", /json/) //ekspetasi response json
                .expect(404)
                .then((response) => {
                    expect(response.body).to.be.a("object");
                    expect(response.body.error).to.have.property("errno") 
                })
                .catch((err) => {
                    console.log(err);
                });
        }) 
    });


})
