import express from 'express';
import AuthRoutes from './routes/auth.route.js';
import Sequelize from './db/config.js';
const app = express();
const PORT = 3000;

app.use(express.json())


//Authentitication Routes
app.use("/api/auth", AuthRoutes)


Sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT} and database successfully connected`);

    })
}).catch((err) => {
    console.log(err)
    console.log(`An error occurred ,when trying to start server at ${PORT}`)
})

