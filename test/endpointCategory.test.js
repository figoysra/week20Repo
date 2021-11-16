const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const getToken = require("./helpers/getToken");

describe("Test endpoint category", () => {
  //tambahkan status di setiap res untuk nangkap status
    it("test get /category", () => {
        getToken.user().then((token)=>{
            request(app)
                .get("/cat") //  endPoint yang akan di check
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
    it("test get details /category/:id", () => {
        getToken.user().then((token) => {
        request(app)
            .get("/cat/1") //  endPoint yang akan di check
            .set("token", token)
            .expect("Content-Type", /json/) //ekspetasi response json
            .expect(200)
            .then((response) => {
            expect(response.body).to.be.a("object"); //ekspetasi response object
            })
            .catch((err) => {
            console.log(err);
            });
        });
    });
    it("test post  /category", () => {
        const newCategory = {
            category : 'noodle'
        }
        getToken.admin().then((token) => {
            request(app)
            .post("/cat") 
            .set("token", token)
            .send(newCategory)
            .expect("Content-Type", /json/) //ekspetasi response json
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a("object");
                expect(response.body.data).to.have.property("insertId"); 
            })
            .catch((err) => {
                console.log(err);
            });
        });
    });
    it('test update /category', ()=>{
        const updCategory = {
            category : 'chinese noodle'
        }
        getToken.admin().then((token)=>{
            request(app)
            .put('/cat/14')
            .set('token',token)
            .send(updCategory)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response)=>{
                expect(response.body).to.be.a('object')
                expect(response.body.data).to.have.property("affectedRows");
            })
        })
    })
    it('test delete /category', () =>{
        getToken.admin().then((token)=>{
            request(app)
            .delete("/cat/62")
            .set("token", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a("object");
                expect(response.body.data).to.have.property("affectedRows");
            });
        })
    })
    
});
