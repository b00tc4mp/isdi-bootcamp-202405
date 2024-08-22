import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types;

// Esquema de Property
const property = new Schema({
  owner: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array de URLs de las imágenes
    required: true,
  },
  location: {
    type: {
      type: String, // El tipo de la geometría, en este caso siempre es 'Point'
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // Array de números [longitud, latitud]
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["apartment", "room"], // Solo puede ser 'apartment' o 'room'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = model("Property", property);

// Esquema de User (ya proporcionado)
const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg",
  },
  dni: {
    type: String,
    required: true,
  },
});

// Esquema de Post
const post = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: {
    type: [ObjectId],
    ref: "User",
  },
});

const User = model("User", user);
const Post = model("Post", post);

export {
  User,
  Post,
  Property, // Exporta el modelo Property
};
