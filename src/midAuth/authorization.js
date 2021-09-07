const connection = require("../config/db")

const authorization = (req, res, next ) =>{
    connection.query(`SELECT * FROM tbl_users`, (err,result)=>{
        if(err){
            res.json(err)
        }else{
            if(result[0].admin === 1){
                next()
            }else{
                res.json({
                    msg: "You Do Not Have Permission To Access",
                });
            }
        }
    })
}
module.exports = authorization