import mongoose from "mongoose";
mongoose.set("strictQuery",true);

async function connectMongoDB(url) {
    return mongoose.connect(url);
}

export {connectMongoDB};