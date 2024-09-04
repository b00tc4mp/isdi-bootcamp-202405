import { Review, User } from "../data/models.js";

export default (reviewerUserId, reviewedUserId, propertyId, rating, comment) => {
  // Crear la reseña con los campos requeridos
  return Review.create({
    reviewer: reviewerUserId,
    reviewedUserId,
    property: propertyId,
    rating,
    comment,
    date: new Date()
  })
  .then(() => {
    // Actualizar el promedio de calificaciones del usuario reseñado
    return Review.aggregate([
      { $match: { reviewedUserId } },
      { $group: { _id: "$reviewedUserId", avgRating: { $avg: "$rating" } } }
    ]);
  })
  .then(result => {
    const avgRating = result.length > 0 ? result[0].avgRating.toFixed(1) : 0;

    return User.findByIdAndUpdate(reviewedUserId, { "profile.rating": avgRating });
  });
};
