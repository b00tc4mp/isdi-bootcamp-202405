import 'dotenv/config';
import mongoose from 'mongoose';
import createProp from './createProp.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info('Connected to MongoDB');

        return createProp(
            '66c45ff92c0dfea87a0518de', // userId
            ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/257488244.jpg?k=c8d9dc30df3fde3698e5cd2fe965f0abe74fb17c6fa12bc553b0fa627a04fca3&o=&hp=1'], // images
            'New flat in the city center', // title
            'This is a lovely 2 bedroom apartment in the heart of the city.', // description
            40.7128, // latitude
            -24.0060, // longitude
            1200, // price
            'apartment' // type
        );
    })
    .then(prop => {
        console.log('Property created:', prop);
    })
    .catch(error => {
        console.error('Error creating property:', error);
    })
    .finally(() => {
        mongoose.disconnect()
            .then(() => console.info('Disconnected from MongoDB'))
            .catch(error => console.error('Error disconnecting from MongoDB:', error));
    });