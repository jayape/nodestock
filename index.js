// Stock Market App

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended :false}));

// API KEY pk_2e8af6c4ffc14edca46fc4b1d6d1de67
// Create API call function
function call_api(finishedAPI, ticker) {
	//request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_2e8af6c4ffc14edca46fc4b1d6d1de67', {json: true}, (err, res, body) => {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/stats/stat?token=pk_2e8af6c4ffc14edca46fc4b1d6d1de67', {json: true}, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = 'Hello there, this is other stuff';

// Set handlebars index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', {
			stock: doneAPI
		});		
	}, "fb");
	
});

// Set handlebars index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		//posted_stuff = req.body.stock_ticker
		res.render('home', {
			stock: doneAPI, 
		});		
	}, req.body.stock_ticker);
	
});

// Set about page routes
app.get('/about.html', function (req, res) {
	res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT))
