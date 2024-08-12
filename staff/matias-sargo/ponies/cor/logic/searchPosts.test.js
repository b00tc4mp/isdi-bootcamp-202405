import "dotenv/config";
import searchPosts from "./searchPosts.js";

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => searchPosts("66b0ca57448059fdf312e4ee", "Hello manu"))
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error))
  .finally(() => mongoose.disconnect());
