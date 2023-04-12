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
    },
    addedBy: {
        type: String
    },
    favoritedBy: {
        type: Array
    }
},
    { timestamps: true }
);

BookSchema.virtual('createdAtFormatted').get(function () {
    return this.createdAt.toLocaleString('en-US', { timeZone: 'UTC' });
});

BookSchema.virtual('updatedAtFormatted').get(function () {
    return this.updatedAt.toLocaleString('en-US', { timeZone: 'UTC' });
});

module.exports = mongoose.model('Book', BookSchema);
