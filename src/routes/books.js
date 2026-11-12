const express = require("express");
const renderErrorHandler = require("../utilities/renderErrorHandler");
const router = express.Router();
const db = require("../db/db");
const { books } =  require("../db/schema");
const { eq } = require("drizzle-orm");

router.get("/", async (req, res) => {
    try {
        const entries = await db.select().from(books);
        return res.status(200).json(entries);
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong!",
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const [entry]= await db
        .select()
        .from(books)
        .where(eq(books.id, +req.params.id));

        if(!entry) {
            return res.status(404).json({
                message: "Book not found!",
            });
        }
        return res.status(200).json(entry);
    } catch (err) {
        return renderErrorHandler;
    }
})

module.exports = router;