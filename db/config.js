import sequelize from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const { DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env

const Sequelize = new sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: "localhost",
    dialect:"mysql"
})


export default Sequelize