import 'dotenv/config'
import getAllFollowingUserPosts from "./getAllFollowingUserPosts.js";
import mongoose from 'mongoose';


mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllFollowingUserPosts('juanfran'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())




