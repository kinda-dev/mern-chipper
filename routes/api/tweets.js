// requests, assign router object to router

const express = require("express");
const router = express.Router();

//following we have the routes

router.get("/test", (req, res) => {
    res.json({ msg: "This is the tweets route" })}
    );

module.exports = router;