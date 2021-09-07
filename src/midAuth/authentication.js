const jwt = require ('jsonwebtoken')
const { JWT_SECRET } = require("../helpers/env"); 

// const midAuth = (req, res, next) => {
//   const { headers } = req;
//   if (headers.token === '123') {
//     next();
//   } else {
//     res.json('token salah');
//   }
// };
// module.exports = midAuth;
const authentication = (req,res,next) => {
  const token = req.headers.token
  jwt.verify(token, JWT_SECRET, (err, decoded)=>{
    if(err){
      res.json(err)
    }else{
      req.userId = decoded.id; 
      next()
    }
  } )
  // console.log(token)
}
module.exports = authentication