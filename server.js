import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl } from './controllers/url.js';
const app=express();
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://harshvarma3695:hv123var@cluster0.9w1d736.mongodb.net/",{
    dbName:'url_short',
},).then(
    console.log("mongoDB are connected....")
    
).catch((err)=>{
    console.log(err);
    
})

app.get('/',(req,res)=>{
    res.render('index.ejs',{shortUrl:null})
})

app.post('/short-url',shortUrl)

app.get("/:shortCode",getOriginalUrl);


const port=1000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})