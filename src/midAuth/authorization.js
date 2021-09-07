const connection = require("../config/db")
// const usersmodel = require(""""")

const authorization = (req, res, next ) =>{
    const id = req.userId;
    connection.query(
      `select * from tbl_users where id='${id}'`,
      (err, result) => {
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
      }
    );
}
module.exports = authorization