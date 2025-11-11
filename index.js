import express from 'express';
import { connectDB } from './Config/connectDB.js';
import userRoutes from './Route/userRoutes.js';
import authRoutes from './Route/authRoutes.js';
import roleRoutes from './Route/roleRoutes.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',userRoutes);
app.use('/auth',authRoutes);
app.use('/role',roleRoutes);

app.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Homepage"
    })
});

app.listen(port,() => {
    console.log(`The server is listening on Port no. ${port}`);
})