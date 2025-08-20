import express from "express";
import urlRoute from "./routes/url.js";
import {connectMongoDB} from "./connection.js";

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/short_url")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("Error in MongoDB is:" , err));

app.use("/url" , urlRoute);

app.listen(PORT , () =>{
    console.log(`server started at localhost:${PORT}`);
})