const express = require('express');

const app = express();
const PORT = 5000 || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// set template engine
app.set("view engine", "pug");

// route prefix
app.use("",require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})