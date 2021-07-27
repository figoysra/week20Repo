require('dotenv').config()
//setiap ada perubahan env harus restart nodemon

const env = {
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD
}
module.exports=env