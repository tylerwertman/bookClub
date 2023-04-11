const Book = require("../models/book.model");

module.exports.findAllBooks = (req, res) => {
    Book.find()
    .then(allBooks => res.json({book: allBooks}))
    .catch(err => res.status(400).json({message: "Something went worng", error: err}))
}
module.exports.findOneBook = (req, res) => {
    Book.findById(req.params.id)
    .then(oneBook => res.json({book: oneBook}))
    .catch(err => res.status(400).json({message: "Something went worng", error: err}))
}
module.exports.createBook = (req, res) => {
    Book.create(req.body)
    .then(newBook => res.json({book: newBook}))
    .catch(err => res.status(400).json({message: "Something went worng", error: err}))
}
module.exports.updateBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    .then(updatedBook => res.json({book: updatedBook}))
    .catch(err => res.status(400).json({message: "Something went worng", error: err}))
}
module.exports.deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(result => res.json({result: result}))
    .catch(err => res.status(400).json({message: "Something went worng", error: err}))
}