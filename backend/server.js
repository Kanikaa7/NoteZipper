const express = require("express");
const notes = require("./data/notes");
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/user.route.js');
const noteRoutes = require('./routes/note.route.js');
const { errorHandler, notFound } = require("./middlewares/error.middleware.js");
const path = require('path');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// ------------ Deployment -------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
}
else{
    app.get("/", (req, res) => {
        res.send("API is Running Successfully");
    });
}
// ------------ Deployment -------------


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running at port ${PORT}`));