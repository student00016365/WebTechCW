const express = require('express');
const router = express.Router();
const fs = require('fs');

let books = []; // Moved outside to load once and be available for all route handlers

// Read the books data once at startup so it's available in memory
fs.readFile('booksData.json', (err, data) => {
    if (err) throw err;
    books = JSON.parse(data);
});

function findBookById(id) {
    // Assuming `id` in booksData.json is a string. If it's a number, convert `id` accordingly.
    return books.find(book => book.id.toString() === id);
}

router.get('/', (req, res) => {
    res.render('index', { books: books }); // Passing the books data to the Pug template
})

router.get('/book/:id', (req, res) => {
    const { id } = req.params;
    const book = findBookById(id);

    if (book) {
        console.log("Book found:", book); // For debugging
        res.render('layout', { book });
    } else {
        console.log("Book not found for ID:", id); // For debugging
        res.status(404).send('Book not found');
    }
});

router.delete('/book/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id.toString() === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // Remove the book from the array

        // Update the JSON file
        fs.writeFile('booksData.json', JSON.stringify(books, null, 2), err => {
            if (err) {
                console.error("Failed to delete the book:", err);
                return res.status(500).send('Error deleting the book.');
            }

            res.send('Book deleted successfully.');
        });
    } else {
        res.status(404).send('Book not found.');
    }
});

router.post('/add-book', (req, res) => {
    // Extracting data from the form submission
    const { name, description, text, picture, category } = req.body;

    // Generate a new ID
    const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;

    const newBook = {
        id: newId,
        name,
        description,
        text,
        picture,
        category // No change needed here; it will capture the selected option value
    };

    // Add the new book to the array
    books.push(newBook);

    // Update the JSON file
    fs.writeFile('booksData.json', JSON.stringify(books, null, 2), err => {
        if (err) {
            console.error("Failed to add the book:", err);
            return res.status(500).send('Error adding the book.');
        }

        res.redirect('/'); // Redirect to the books listing page, or wherever appropriate
    });
});

router.get('/add-book', (req, res) => {
    res.render('postBook');
})

router.post('/edit-book/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, text, category, picture } = req.body;

    // Find the index of the book in the array
    const index = books.findIndex(book => book.id.toString() === id);

    if (index !== -1) {
        // Update the book data
        books[index] = {
            id: parseInt(id),
            name,
            description,
            text,
            category,
            picture
        };

        // Write the updated data back to the JSON file
        fs.writeFile('booksData.json', JSON.stringify(books, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to update book');
            } else {
                res.redirect(`/`); // Redirect to the book details page
            }
        });
    } else {
        res.status(404).send('Book not found');
    }
});

router.get('/edit-book/:id', (req, res) => {
    const { id } = req.params;
    const book = findBookById(id);

    if (book) {
        res.render('editBook', { book });
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports = router;
