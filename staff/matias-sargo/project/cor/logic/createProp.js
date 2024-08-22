import { User, Property } from "../data/models.js";

import { validate, errors } from "../../com/index.js";

const { NotFoundError, SystemError } = errors;

export default (
  userId,
  images,
  title,
  description,
  latitude,
  longitude,
  price,
  type
) => {
  // Validaciones
  validate.string(userId, "userId");
  validate.string(title, "title");
  validate.string(description, "description");
  validate.array(images, validate.url, "images"); // Validamos que las imágenes sean un array de URLs
  images.forEach((image, index) => validate.url(image, `images[${index}]`)); // Validamos cada URL en el array
  validate.latitude(latitude, "latitude");
  validate.longitude(longitude, "longitude");
  validate.number(price, "price");
  validate.type(type, "type", ["apartment", "room"]);

  // Preparar la ubicación como un objeto Point
  const location = {
    type: "Point",
    coordinates: [longitude, latitude], // Primero longitud, luego latitud
  };

  // Buscar el usuario en la base de datos
  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      // Crear la propiedad en la base de datos
      return Property.create({
        images,
        title,
        description,
        location,
        price,
        type,
        owner: userId, // Asumimos que el campo se llama `owner` para referirse al usuario que crea la propiedad
      }).catch((error) => {
        throw new SystemError(error.message);
      });
    });
};
// import { Property, User } from '../data/models.js';
// import { validate, errors } from '../../com/index.js';

// const { NotFoundError, SystemError } = errors;

// export default async function createProp(userId, images, description, latitude, longitude, price, type) {
//     validate.string(userId, 'userId');
//     validate.array(images, validate.url, 'images');
//     validate.string(description, 'description');
//     validate.latitude(latitude, 'latitude');
//     validate.longitude(longitude, 'longitude');
//     validate.number(price, 'price');
//     validate.type(type, 'type');

//     const user = await User.findById(userId);
//     if (!user) throw new NotFoundError('User not found');

//     const location = {
//         type: 'Point',
//         coordinates: [longitude, latitude]
//     };

//     try {
//         const property = await Property.create({
//             owner: userId,
//             images,
//             description,
//             location,
//             price,
//             type
//         });

//         // Asocia la propiedad con el usuario
//         user.properties.push(property._id);
//         await user.save();

//         return property;
//     } catch (error) {
//         throw new SystemError(error.message);
//     }
// }