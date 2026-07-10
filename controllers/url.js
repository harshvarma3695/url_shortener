import shortid from "shortid";
import { url } from "../models/Url.js"
export const shortUrl=async(req,res)=>{
    const longUrl=req.body.longUrl;
    const shortCode=shortid.generate();

    const shortUrl = `http://localhost:1000/${shortCode}`;

    const newUrl=new url({shortCode,longUrl})
    await newUrl.save();

    console.log("short saved =",newUrl);
    res.render("index.ejs",{shortUrl})

}

export const getOriginalUrl=async(req,res)=>{
    const shortCode=req.params.shortCode
    const originalUrl=await url.findOne({shortCode})

    if(originalUrl){
        res.redirect(originalUrl.longUrl)
    }else{
        res.json({message:'invalid shortUrl'})
    }
}