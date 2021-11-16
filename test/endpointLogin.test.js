const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const fs = require("fs");

// kondisi error

describe("Test endpoint Login", () => {
    it("Test post /login with 404 error wrong email", () => {
        request(app)
        .post("/login")
        .send({
            email : "adminufykhdsuads",
            password : "admin"
        })
        .expect(404)
        .expect("Content-Type", /json/)
        .then((res) => {
            expect(res.body).to.be.a("object");
        })
        .catch((err) => {
            console.log(err);
        });
    })
    it("Test post /login with 404 error wrong password", () => {
        request(app)
            .post("/login")
            .send({
            email: "admin",
            password: "admindasud",
            })
            .expect(404)
            .expect("Content-Type", /json/)
            .then((res) => {
            expect(res.body).to.be.a("object");
            })
            .catch((err) => {
            console.log(err);
            });
    });
    it("Test post /login with 401 error bycrypt", () => {
        request(app)
        .post("/login")
        .send({
            email : "admin",
        })
        
        .expect("Content-Type", /json/)
        .expect(401)
        
        .then((res) => {
            expect(res.body).to.be.a("object");
        })
        .catch((err) => {
            console.log(err);
        });
    })
})