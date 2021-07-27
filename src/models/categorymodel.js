const db = require('../config/db')

const categorymodel = {
    getAllData : () =>{
        return new Promise ((resolve, reject)=>{
            db.query(`select * from tbl_category`,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    getList : (search,field,typeSort,limit,offset) =>{
        return new Promise ((resolve, reject)=>{
            db.query(`select * from tbl_category where category LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    getdetails : (id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`select * from tbl_category where id='${id}'`,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    insert : (body) =>{
        return new Promise((resolve, reject)=>{
            const {category} = body
            db.query(`INSERT INTO tbl_category (category) value ('${category}')`,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    update : (id,body) =>{
        return new Promise ((resolve, reject)=>{
            const {category} = body
            db.query(`UPDATE tbl_category SET category ='${category}' where id = ${id}`,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    destroy : (id)=>{
        return new Promise((resolve,reject)=>{
            db.query(`DELETE FROM tbl_category WHERE id=${id}`, (err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
}
module.exports= categorymodel