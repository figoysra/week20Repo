const usersmodel = require('../models/usersmodel')
const {success,failed}= require('../helpers/response')

const users = {
    getList : (req, res) =>{
        try {
            const query = req.query
            const search = query.search === undefined ? "" : query.search
            const field = query.field === undefined ? "id" : query.field
            const typeSort = query.sort === undefined ? "ASC" : query.sort
            const limit = query.limit === undefined ? 10 : query.limit
            const offset = query.page === undefined || query.page == 1 ? 0 : (query.page-1)*limit
            usersmodel.getList(search,field,typeSort,limit,offset).then(async(result)=>{
                const alldata = await usersmodel.getAllData()
                const response = {
                    data: result,
                    totalPage: Math.ceil(alldata.length/limit),
                    page : req.query.page
                }
                success(res,response,"get all users success")
                
            }).catch((err)=>{
                failed(res,404, err)
                // console.log(err)
            })
        } catch (error) {
            failed(res, 401, error)
            // res.json(error)
        }
    },
    getdetails : (req,res)=>{
        try {
            const id = req.params.id
            usersmodel.getdetails(id).then((result)=>{
                success(res,result,"get details data success")
                // res.json(result)
            }).catch((err)=>{
                failed(res,404, err)
                // console.log(err)
            })
        } catch (error) {
            failed(res, 401, error)
            // res.json(error)
        }
    },
    insert : (req, res) =>{
        try {
            const body = req.body
            usersmodel.insert(body).then((result)=>{
                success(res,result,"insert data success")
                // res.json(result)
            }).catch((err)=>{
                failed(res,404, err)
                // console.log(err)
            })
        } catch (error) {
            failed(res, 401, error)
            // res.json(error)
        }
    },
    update : (req, res) =>{
        try {
            const id = req.params.id
            const body = req.body
            usersmodel.update(id,body).then((result)=>{
                success(res,result,"update data success")
                // res.json(result)
            }).catch((err)=>{
                failed(res,404, err)
                // resolve(err)
            })
        } catch (error) {
            failed(res, 401, error)
            // res.json(error)
        }
    },
    destroy : (req,res)=>{
        try {
            id = req.params.id
            usersmodel.destroy(id).then((result)=>{
                success(res,result,"delete data success")
                // res.json(result)
            }).catch((error)=>{
                failed(res,404, error)
                // console.log(error)
            })
        } catch (error) {
            failed(res, 401, error)
        }
    }

}


module.exports = users