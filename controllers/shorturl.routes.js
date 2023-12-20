const express = require("express");
require("dotenv").config();
const shorturlRouter = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });

const { UrlModel } = require("../models/shorturl.model");

shorturlRouter.post("/shorten", authenticate, async (req, res) => {
  const { userID, original_url } = req.body;
  if (original_url == "") {
    return res.send({ message: "Provide Valid URL" });
  }
  const url = await UrlModel.findOne({ userID, original_url });

  if (url) {
    const { original_url, short_url } = url;
    res.send({ original_url, short_url });
  } else {
    const shortenid = uid.rnd();
    const short_url = `https://tough-bee-flip-flops.cyclic.app/${shortenid}`;

    try {
      const url = new UrlModel({ userID, original_url, short_url });
      await url.save();

      res.send({ original_url, short_url });
    } catch (error) {
      res.send({ error });
    }
  }
});

shorturlRouter.get("/allUrls",authenticate,async(req,res)=>{

try{
    const urls  = await UrlModel.find({userID:req.body.userID})
    res.send(urls)
  }
  catch(error){
      res.send({error})
  }
})

shorturlRouter.get("/:shortid", async (req, res) => {
  const id = req.params.shortid;
  const short_url = `https://tough-bee-flip-flops.cyclic.app/${id}`;

  try {
    const url = await UrlModel.findOne({ short_url });
    res.redirect(url.original_url);
  } catch (error) {
    res.send({ error });
  }
});





module.exports = {
  shorturlRouter
};
