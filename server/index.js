import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from '../server/mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

const app=express();
dotenv.config();

const PORT=8080;
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

const startServer=async()=>{
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>
        {
            console.log('Server is up and running at ',{PORT})
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
startServer();

app.get('/',async(req,res)=>
{
    res.send('Hello');
})