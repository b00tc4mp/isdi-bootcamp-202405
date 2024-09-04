import { User, Property } from "../data/models.js";
import { validate, errors } from "../../com/index.js";

const { NotFoundError, SystemError } = errors;

export default (
  userId,
  images,
  title,
  description,
  address,
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
  validate.type(type, "type");
  validate.string(address, "address");

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
        address, // Incluir el campo de dirección
        location,
        price,
        type,
        owner: userId, // Asumimos que el campo se llama `owner` para referirse al usuario que crea la propiedad
        aviable: true, // Por defecto, la propiedad está disponible
      }).catch((error) => {
        throw new SystemError(error.message);
      });
    });
};
