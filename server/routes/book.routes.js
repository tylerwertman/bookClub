const BookController = require("../controllers/book.controller")

module.exports = app => {
    app.get('/api/books', BookController.findAllBooks)
    app.get('/api/books/:id', BookController.findOneBook)
    app.post('/api/books', BookController.createBook)
    app.put('/api/books/:id', BookController.updateBook)
    app.delete('/api/books/:id', BookController.deleteBook)
}