import 'dotenv/config'
import getAllFollowingUserPosts from "./getAllFollowingUserPosts.js";
import mongoose from 'mongoose';


mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFollowingUserPosts('66acc0c8863c3606c60ba912'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())




