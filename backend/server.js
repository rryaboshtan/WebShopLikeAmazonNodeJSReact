import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
// var db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
    res.send('Server is ready')
});

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
}
)