import shortid from "shortid";
import { url } from "../models/Url.js";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;

  const shortCode = shortid.generate();

  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  const newUrl = new url({
    shortCode,
    longUrl,
  });

  await newUrl.save();

  console.log("Short URL saved =", newUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  const originalUrl = await url.findOne({ shortCode });

  if (originalUrl) {
    return res.redirect(originalUrl.longUrl);
  }

  res.status(404).json({
    message: "Invalid Short URL",
  });
};
