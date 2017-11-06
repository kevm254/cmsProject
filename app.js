const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');

const pagesRoutes = require('./routes/pages.js');
const adminPagesRoutes = require('./routes/admin_pages.js');

const port = 3000;

// Connect to the database
mongoose.connect(config.database);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
   console.log('connected to database');
});

// init app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// ======================================================== //
// * Routes
// ======================================================== //
app.use('/', pagesRoutes);
app.use('/admin/pages', adminPagesRoutes);
// ======================================================== //
// * END Routes
// ======================================================== //


// ======================================================== //
// * Start the server
// ======================================================== //
app.listen(port, () => {
   console.log('Server running on port: ', port);
});