import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home");//render use for require ejs file 
});

router.get("/signup" , (req,res) => {
  return res.render("signup");
});

export default router;
