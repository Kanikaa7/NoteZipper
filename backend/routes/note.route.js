const express = require("express");
const router = express.Router();

const {getNotes, createNote, getNoteById, updateNote, deleteNote} = require("../controllers/note.controller");
const { protect } = require("../middlewares/auth.middleware");

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router.route("/:id")
    .get(getNoteById)
    .put(protect,updateNote)
    .delete(protect, deleteNote);

module.exports = router;