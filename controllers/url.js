import shortid from "shortid";
import { URL } from "../models/url.js";

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "Url Is Required"});
    const shortID = shortid.generate();

    await URL.create({
        shortID: shortID,
        redirectURL:body.url,
        visitHistory: [],
    });

    return res.json({ id : shortID});
}

export {handleGenerateNewShortURL};