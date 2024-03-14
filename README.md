To install the dependencies listed in the package.json file, you can use npm, the Node.js package manager. Here's the dependency list and how to install them:

Dependency List
express: ^4.18.3
pug: ^3.0.2
nodemon: ^3.1.0

run npm install express
npm install pug
npm install nodemon --save-dev

after installing dependencies run command: npm start then it should give you the address of the application which will be: http://localhost:5000 or http://localhost:3000 if 5000 is busy.


About the app: This application is designed for bookStore it contains all relevant information of books including: book name, description, full text, category, and book image. The home page contains all book data and displays them and within each book card there are buttons as edit, delete and read which respectively does same functions as their names. There is also addBook page with propper forms and inputs that is designed to persist new bookdata to json file and display it in main page.


Documentation: This web application is designed to manage books, allowing users to add, edit, delete, and search for books. It provides a user-friendly interface for managing book data efficiently.


Project structure: there is routes folder and routes.js file within the folder, there is views folder and all UI of the application inside it. There is app.js file, booksData.json file, gitignoe and others. I didn't create public folder because i did'nt use images i instead used links for that images also i didn't use any css styling since my application was created in bootstrap. I also didn't create controllers directory because i included all necessary logic and functions inside router.js for compatibility.

LINK TO THE GITHUB REPO: https://github.com/student00016365/WebTechCW


LINK TO HOSTED APPLICATION: https://zany-cyan-sea-urchin-cap.cyclic.app/   (Please make sure to install dependencies and run application on your computer, because hosted website is free and giving some occasional errors but those errors do not exisist in this project)
