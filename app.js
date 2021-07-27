const express  = require ('express')
const bodyparser = require('body-parser')
const usersrouter = require('./src/routers/users')
const productsrouter = require('./src/routers/products')
const categoryrouter = require ('./src/routers/category')


const app = express()
app.use(bodyparser.json())
app.use(usersrouter)
app.use(productsrouter)
app.use(categoryrouter)

app.listen(2000,()=>{
    console.log("service running on port 2000")
})