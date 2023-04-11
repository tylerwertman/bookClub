const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be at least 2 characters"]
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        minlength: [2, "Author must be at least 2 characters"]
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Book', BookSchema);
