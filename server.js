import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
import connectDB from './config/connectdb.js';
const app = express();
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
//Load route
app.use(express.json())
app.use("/api", userRoutes )


connectDB(DATABASE_URL);
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})