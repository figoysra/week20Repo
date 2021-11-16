const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const getToken = require('./helpers/getToken')
const fs = require('fs')

describe("Test endpoint Users", () => {
    //tambahkan status di setiap res untuk nangkap status
    it("test get /users", () => {
        getToken.admin().then((token)=>{
            request(app)
                .get("/users") //  endPoint yang akan di check
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
    it("test get /users with wrong authorization", () => {
        getToken.user().then((token) => {
            request(app)
            .get("/users") //  endPoint yang akan di check
            .set("token", token)
            .expect("Content-Type", /json/) //ekspetasi response json
            .expect(401)
            .then((response) => {
                expect(response.body).to.be.a("object"); //ekspetasi response object
            })
            .catch((err) => {
                console.log(err);
            });
        });
    });
    it("test get /users with wrong authentication", () => {
        request(app)
        .get("/users") //  endPoint yang akan di check
        .set("token", "132")
        .expect("Content-Type", /json/) //ekspetasi response json
        .expect(401)
        .then((response) => {
            expect(response.body).to.be.a("object"); //ekspetasi response object
        })
        .catch((err) => {
            console.log(err);
        });
    });
    it("test get /users", () => {
        getToken.user().then((token) => {
            request(app)
            .get("/users/55") //  endPoint yang akan di check
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
    it('test update /users',()=>{
        const filePath = `${__dirname}/helpers/image/image1.jpg`
        fs.exists(filePath,(exists)=>{
            if(!exists){
                console.log('Image tidak tersedia')
            }else{
                request(app)
                .put('/users/55')
                .field('email', 'updateadmin200@gmail.com')
                .field('password', 'admin')
                .attach('photo', filePath)
                .field('phone','62812')
                .field('admin', '0')
                .expect("Content-Type", /json/)
                .then((response)=>{
                    expect(response.body).to.be.a('object')
                    expect(response.body.data).to.have.property('affectedRows')
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
    })
    it('test delete /users',()=>{
        request(app)
        .delete('/users/76')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body).to.be.a('object')
            
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    // Kondisi Error
    it('test update /users with error 404 wrong id',()=>{
        const filePath = `${__dirname}/helpers/image/image1.jpg`
        fs.exists(filePath,(exists)=>{
            if(!exists){
                console.log('Image tidak tersedia')
            }else{
                request(app)
                .put('/users/999')
                .field('email', 'updateadmin200@gmail.com')
                .field('password', 'admin')
                .attach('photo', filePath)
                .field('phone','62812')
                .field('admin', '0')
                .expect(404)
                .expect("Content-Type", /json/)
                .then((response)=>{
                    expect(response.body).to.be.a('object')
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
    })
    it('test update /users with 401 error bycrypt',()=>{
        const filePath = `${__dirname}/helpers/image/image1.jpg`
        fs.exists(filePath,(exists)=>{
            if(!exists){
                console.log('Image tidak tersedia')
            }else{
                request(app)
                .put('/users/29')
                // .field('email', 'admin')
                // .attach('photo', filePath)
                .expect(401)
                .expect("Content-Type", /json/)
                .then((response)=>{
                    expect(response.body).to.be.a('object')
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
    })
    it('test delete /users with 404 error wrong id',()=>{
        request(app)
        .delete('/users/399')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res)=>{
            expect(res.body).to.be.a('object')
            
        })
        .catch((err)=>{
            console.log(err)
        })
    })

});
