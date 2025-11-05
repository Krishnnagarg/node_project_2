import express from "express";
import { URL } from "../models/url.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {   //render use for require ejs file 
    urls  : allUrls ,
  });   
});

// router.get("/signup" , (req,res) => {
//   return res.render("signup");
// });

export default router;
