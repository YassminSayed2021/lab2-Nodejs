require("dotenv") .config()

module.exports ={
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
}