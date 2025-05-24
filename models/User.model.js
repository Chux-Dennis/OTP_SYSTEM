import { DataTypes } from "sequelize";
import Sequelize from "../db/config.js";


const User = Sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    otp:{
        type:DataTypes.STRING,
        allowNull: true
    },
    otpExpires: {
        type: DataTypes.DATE,
        allowNull:true
    }

}, {
    freezeTableName:true
})

User.sync().then(() => {
    console.log("Altering Successful");
    
}).catch((err) => {
    console.log("an error occurred , when trying to update the table");
    
})



export default User