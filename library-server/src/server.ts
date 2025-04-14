import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from './config';
import {registerRoutes} from './routes';
import dotenv from 'dotenv';
import summarizeRouter from './routes/summarizebyTitle';
import chatRouter from './routes/chat';
import reviewRoutes from './routes/Review';

dotenv.config();

const PORT = config.server.port;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/api', summarizeRouter);
app.use('/api', chatRouter);
app.use('/api/reviews', reviewRoutes);

(async function startup(){
    try{
        await mongoose.connect(config.mongo.url,{w:"majority", retryWrites:true, authMechanism:"DEFAULT"});
        console.log("Connection to the MongoDB succesfully made");

        registerRoutes(app);
        
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch(error){
        console.log("Could not make a connection to the database");
    }
})();

