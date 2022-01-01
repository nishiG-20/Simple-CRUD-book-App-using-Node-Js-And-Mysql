const express = require("express");
const router = express.Router();
const bookControllers = require("../Controllers/bookControllers");

//Show Books Data
router.get("/booksapp/books/:genre?", bookControllers.showBooks);
//Add New Book
router.post("/booksapp/books/addBook",bookControllers.addNewBook);
//Update Books Data
router.put("/booksapp/books/editBook/:id", bookControllers.editBook);
//Delete Book Data
router.delete("/booksapp/books/deleteBook/:id", bookControllers.deleteBook);
//Show Book Detail By Book id
router.get("/booksapp/books/bookid/:id", bookControllers.showBookById);

module.exports = router;
