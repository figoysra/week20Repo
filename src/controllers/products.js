const productsmodel = require('../models/productsmodel')
const {success,failed}= require('../helpers/response')

const product = {
    getList : (req, res) =>{
        try {
            const query = req.query
            const search = query.search === undefined ? "" : query.search
            const field = query.field === undefined ? "tbl_products.id" : query.field
            const typeSort = query.sort === undefined ? "ASC" : query.sort
            const limit = query.limit === undefined ? 10 : query.limit
            const offset = query.page === undefined || query.page == 1 ? 0 : (query.page-1)*limit
            productsmodel.getList(search,field,typeSort,limit,offset).then(async(result)=>{
                const alldata = await productsmodel.getAllData()
                const response = {
                    data: result,
                    totalPage: Math.ceil(alldata.length/limit),
                    page : req.query.page
                }
                success(res,response,"get all users success")
                
            }).catch((err)=>{
                failed(res,404,err)
                // console.log(err)
            })
        } catch (error) {
            failed(res,401,error)
            // res.json(error)
        }
    },
    getdetails : (req,res)=>{
        try {
            const id = req.params.id
            productsmodel.getdetails(id).then((result)=>{
                success(res,result,"get details data success")
                // res.json(result)
            }).catch((err)=>{
                failed(res,404,err)
                // console.log(err)
            })
        } catch (error) {
            // res.json(error)
            failed(res,401,error)
        }
    },
    insert : (req, res) =>{
        try {
            const body = req.body
            productsmodel.insert(body).then((result)=>{
                // res.json(result)
                success(res,result,"insert data success")
            }).catch((err)=>{
                failed(res,404,err)
                // console.log(err)
            })
        } catch (error) {
            failed(res,401,error)
            // res.json(error)
        }
    },
    update : (req, res) =>{
        try {
            const id = req.params.id
            const body = req.body
            productsmodel.update(id,body).then((result)=>{
                success(res,result,"update data success")
                // res.json(result)
            }).catch((err)=>{
                failed(res,404,error)
                // console.log(err)
            })
        } catch (error) {
            failed(res,401,error)
            // res.json(error)
        }
    },
    destroy : (req,res)=>{
        try {
            id = req.params.id
            productsmodel.destroy(id).then((result)=>{
                success(res,result,"delete data success")
                // res.json(result)
            }).catch((error)=>{
                failed(res,404,error)
                // console.log(error)
            })
        } catch (error) {
            failed(res,401,error)
        }
    }

}


module.exports = product