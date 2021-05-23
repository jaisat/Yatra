const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log('DATABASE CONNECTED!!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('home');
});
app.get('/makecampground', async (req, res) => {
	const camp = new Campground({ title: 'My Backyard' ,description:'Cheep'});
	await camp.save();
    res.send(camp);
});

app.listen(8000, () => {
	console.log('Server Started!!');
});
