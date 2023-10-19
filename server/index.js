// Desc: main entry point for the server
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import helmet from 'helmet';

//importing routes
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

//initializing app
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


//db connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected')
        app.listen(port, async () => {
      
            console.log(`listening on port ${port}`);
        });

    }).catch((err) => {
        console.log(err);
    });