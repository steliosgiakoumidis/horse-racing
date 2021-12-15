import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import entriesRouter from './routes'
import mongoose from "mongoose";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(entriesRouter);

const uri: string = process.env.MONGO_CONNECTIONSTRING as string;
console.log(uri)
mongoose.connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });
}).catch(err => {
    console.log(err)
})



