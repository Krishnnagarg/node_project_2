import shortid from "shortid";
import { URL } from "../models/url.js";

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "Url Is Required"});
    const shortID = shortid();
    await URL.create({
        shortID: shortID,
        redirectUrl:body.url,
        visitHistory: [],
    });

    return res.json({ id : shortID});
}

export {handleGenerateNewShortURL};