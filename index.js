import express from 'express';
import { connectDB } from './Config/connectDB.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Homepage"
    })
});

app.listen(port,() => {
    console.log(`The server is listening on Port no. ${port}`);
})