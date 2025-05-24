import express from 'express';
import AuthRoutes from './routes/auth.route.js';
import Sequelize from './db/config.js';
const app = express();
const PORT = 3000;

app.use(express.json())


//Authentitication Routes
app.use("/api/auth",AuthRoutes)


// User.create({
//     username: "Josiah Benson",
//     email: "cks@email.co.uk",
//     password: "Hello Worlmdlk $",
//     isVerified:true
// }).then(() => {
//     console.log("User Created Succesffuly");
    
// }).catch((err) => {
//     console.log(err);
    
// })



// app.use("/api/v1/users", UserRoute);

Sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT} and database successfully connected`);
        
    })
})

