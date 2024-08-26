import 'dotenv/config';
import mongoose from 'mongoose';
import createReview from './createReview.js';
import registerUser from './registerUser.js';
import createProp from './createProp.js';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Crear el usuario que hará la reseña
        return registerUser('John', 'Doe', 'john.doe@example.com', 'johndoe', 'a12345678z', '123123123', '123123123', 'tenant');
    })
    .then(reviewer => {
        console.log('Reviewer created:', reviewer);

        // Crear el usuario que recibirá la reseña
        return registerUser('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', 'b87654321z', '123123123', '123123123', 'landlord')
            .then(reviewed => {
                console.log('Reviewed created:', reviewed);

                // Crear la propiedad que será reseñada
                return createProp(
                    reviewed._id.toString(),
                    ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
                    'Beautiful apartment in the city center',
                    'This is a lovely 2 bedroom apartment in the heart of the city.',
                    '123 Main St, New York, NY',
                    40.7128,
                    -74.0060,
                    2500,
                    'apartment'
                ).then(property => {
                    console.log('Property created:', property);

                    // Crear la reseña
                    return createReview(reviewer._id.toString(), reviewed._id.toString(), property._id.toString(), 5, 'Great property!');
                });
            });
    })
    .then(() => {
        console.log('Review created successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => mongoose.disconnect());
