import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl } from './controllers/url.js';
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.urlencoded({extended:true}))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/',(req,res)=>{
    res.render('index.ejs',{shortUrl:null})
})

app.post('/short-url',shortUrl)

app.get("/:shortCode",getOriginalUrl);


const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});