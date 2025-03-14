import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import serviceRoutes from './routes/services.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/services', serviceRoutes);

const CONNECTION_URL = 'mongodb+srv://noobmaster:noobmaster231@cluster0.gp6d2.mongodb.net/salon_db?retryWrites=true&w=majority&appName=Cluster0'
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(`${error}: did not connect`));

// mongoose.set('useFindAndModify', false);