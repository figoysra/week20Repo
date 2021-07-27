const express = require('express')
const {getList,getdetails, insert, update, destroy} = require ('../controllers/users')

const usersrouter = express.Router()

usersrouter
.get ('/users', getList)
.get ('/users/:id', getdetails)
.post ('/users', insert)
.put ('/users/:id', update)
.delete ('/users/:id', destroy)


module.exports= usersrouter