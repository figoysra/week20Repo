
const db = require ('../config/db')

const usersmodel = {
    getAllData : () =>{
        return new Promise ((resolve, reject)=>{
            db.query(`select * from tbl_users`,(err,result)=>{
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
            db.query(`select * from tbl_users where dis_name LIKE '%${search}%' ORDER BY ${field} ${typeSort} LIMIT ${limit} OFFSET ${offset}`,(err,result)=>{
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
            db.query(`select * from tbl_users where id='${id}'`,(err,result)=>{
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
            const {email,password,photo,dis_name,firstname,lastname,date, gender,address,phone} = body
            db.query(`INSERT INTO tbl_users (email,password,photo,dis_name,firstname,lastname,date,gender,address,phone) value ('${email}',md5('${password}'),'${photo}','${dis_name}', '${firstname}', '${lastname}','${date}','${gender}','${address}',${phone})`,(err,result)=>{
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
            const {email,password,photo,dis_name,firstname,lastname,date, gender,address,phone} = body
            db.query(`UPDATE tbl_users SET email = '${email}',password = md5('${password}'),photo='${photo}',dis_name='${dis_name}',firstname= '${firstname}',lastname= '${lastname}',date='${date}',gender='${gender}',address='${address}',phone=${phone} WHERE id='${id}'`,(err,result)=>{
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
            db.query(`DELETE FROM tbl_users WHERE id=${id}`, (err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

} 

module.exports = usersmodel