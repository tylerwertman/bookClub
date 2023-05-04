const Book = require("../models/book.model");
const User = require("../models/user.model")

module.exports.findAllBooks = (req, res) => {
    Book.find()
        .populate("addedBy favoritedBy")
        .then(allBooks => res.json({ book: allBooks }))
        .catch(err => res.status(400).json({ message: "Something went worng finding all books", error: err }))
}
module.exports.findOneBook = (req, res) => {
    Book.findById(req.params.id)
        .populate("addedBy favoritedBy")
        .then(oneBook => res.json({ book: oneBook }))
        .catch(err => res.status(400).json({ message: "Something went worng finding one book", error: err }))
}
module.exports.createBook = (req, res) => {
    Book.create(req.body)
        .then(newBook => {
            User.findByIdAndUpdate(newBook.user, {$push: {book: newBook._id}})
                .then(()=> console.log("Successfully add new book to User.books", newBook))
                .catch(err=> res.json({message: "Something went wrong finding user in book.create()", error: err}))
            res.json({ book: newBook })
        })
        .catch(err => res.status(400).json({ message: "Something went worng creating a book", error: err }))
}
module.exports.updateBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .populate("addedBy favoritedBy")
        .then(updatedBook => {
            res.json({ book: updatedBook })
            console.log("Successfully updated a book in User.books", updatedBook)
        })
        .catch(err => res.status(400).json({ message: "Something went worng updating a book", error: err }))
}
module.exports.deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json({ message: "Something went worng deleting a book", error: err }))
}
module.exports.deleteAllBooks = (req, res) => {
    Book.deleteMany()
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json({ message: "Something went worng deleting all books", error: err }))
}