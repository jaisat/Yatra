const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '60b0b6d88504f27d9f181eae',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fugit iste cum, voluptatum minus sed labore alias? Magni perferendis dolor at asperiores cupiditate. Consequuntur, dolorem perspiciatis. Iure explicabo asperiores maxime!',
			price,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: [
				{
					url:
						'https://res.cloudinary.com/drkiqtcah/image/upload/v1622217430/YelpCamp/gkiwhci43c2cuue73med.jpg',
					filename: 'YelpCamp/gkiwhci43c2cuue73med'
				},
				{
					url:
						'https://res.cloudinary.com/drkiqtcah/image/upload/v1622217435/YelpCamp/ch71f4x35lq80znfs7gy.jpg',
					filename: 'YelpCamp/ch71f4x35lq80znfs7gy'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
