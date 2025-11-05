import express from "express";
import path from "path";
import { connectToMongoDB } from "./connection.js";
import { URL } from "./models/url.js";

import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error in MongoDB is:", err));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//------> this is middleware 
app.use(express.json());// means support json data
app.use(express.urlencoded({ extended: false }));//means support form data 

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home');
});

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
