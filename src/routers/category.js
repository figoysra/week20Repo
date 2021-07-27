const express = require('express')
const {getList,getdetails,insert,update,destroy}=require('../controllers/category')

const categoryrouter = express.Router()

categoryrouter
.get ('/cat',getList)
.get ('/cat/:id', getdetails)
.post('/cat', insert)
.put('/cat/:id', update)
.delete('/cat/:id',destroy)


module.exports=categoryrouter