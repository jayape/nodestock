// Stock Market App

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set HAndlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const otherstuff = 'Hello there, this is other stuff';

// Set handlebars routes
app.get('/', function (req, res) {
	res.render('home', {
		stuff: otherstuff
	});
});

// Set about page routes
app.get('/about.html', function (req, res) {
	res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT))
