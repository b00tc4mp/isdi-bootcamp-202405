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
  aviable: {
    type: Boolean,
    required: true,
    default: true,
  },
  images: {
    type: [String], // Array de URLs de las imágenes
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: { type: [Number], required: true }, // [longitud, latitud]
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["apartment", "room"], //  'apartment' o 'room'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = model("Property", property);

// Esquema de User
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
    unique: true,
  },
  role: {
    type: String,
    enum: ["owner", "tenant"],
    required: true,
    required: true,
    default: "user",
  },
  profile: {
    bio: String,
  },
});

const document = new Schema({
  property: {
    type: ObjectId,
    required: true,
    ref: "Property",
  },
  content: {
    type: Buffer,
    required: true,
  },
  type: {
    type: String,
    enum: ["contract", "invoice", "tax"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const review = new Schema({
  property: { type: ObjectId, ref: "Property" }, // Referencia opcional a la propiedad si la reseña es sobre una propiedad
  user: { type: ObjectId, ref: "User" }, // Referencia opcional al usuario si la reseña es sobre un usuario
  reviewer: { type: ObjectId, ref: "User", required: true }, // El usuario que deja la reseña
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  date: { type: Date, default: Date.now },
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

const contract = new Schema({
  property: { type: ObjectId, ref: "Property", required: true },
  owner: { type: ObjectId, ref: "User", required: true },
  tenant: { type: ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  signedBy: { type: [ObjectId], ref: "User" },
});

const User = model("User", user);
const Post = model("Post", post);
const Document = model("Document", document);
const Review = model("Review", review);
const Contract = model("Contract", contract);

export { User, Post, Property, Document, Review, Contract };
