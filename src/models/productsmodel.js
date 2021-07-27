
const db = require ('../config/db')

const productsmodel = {
    getAllData : () =>{
        return new Promise ((resolve, reject)=>{
            db.query(`select * from tbl_products`,(err,result)=>{
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
            db.query(`select * from tbl_products left join tbl_category on tbl_products.category_id=tbl_category.id
            where tbl_products.product_name LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset} `,(err,result)=>{
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
             db.query(`select * from tbl_products left join tbl_category on tbl_products.category_id=tbl_category.id where tbl_products.id='${id}'`,(err,result)=>{
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
            const {product_name,picture,description,category_id} = body
            db.query(`INSERT INTO tbl_products (product_name,picture,description,category_id) value ('${product_name}','${picture}','${description}',${category_id})`,(err,result)=>{
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
            const {product_name,picture,description,category_id} = body
            db.query(`UPDATE tbl_products SET product_name ='${product_name}',picture='${picture}',description='${description}', category_id= ${category_id} where id = ${id}`,(err,result)=>{
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
            db.query(`DELETE FROM tbl_products WHERE id=${id}`, (err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

} 

module.exports = productsmodel