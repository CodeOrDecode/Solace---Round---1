const { Router } = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const Bookmodel = require("../models/bookModel");


const bookRouter = Router();


bookRouter.post("/create", authmiddleware, async (req, res) => {
    const { title, author, userid, username } = req.body;

    try {
        let book = new Bookmodel({ title, author, userid, username });
        await book.save();
        res.status(200).json({ message: "book created successfully" });
    } catch (error) {
        res.status(400).json({ message: "error creating book" });
    }

})

bookRouter.get("/allbook", authmiddleware, async (req, res) => {

    try {
        let books = await Bookmodel.find()
        res.status(200).json({ message: "all notes", books });
    } catch (error) {
        res.status(400).json({ message: "error getting books" });
    }

})

bookRouter.get("/search", async (req, res) => {
    console.log(req.query.q);

    try {
        let book = await Bookmodel.find({ title: req.query.q })
        res.status(200).json({ message: "getting book", book });
    } catch (error) {
        res.status(400).json({ message: "error getting book" });
    }

})



module.exports = bookRouter
