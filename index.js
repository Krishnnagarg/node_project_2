import express from "express";
import urlRouter from "./routes/url.js";
import { connectMongoDB } from "./connection.js";
import { URL } from "./models/url.js";

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/short_url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error in MongoDB is:", err));

app.use(express.json());

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
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
