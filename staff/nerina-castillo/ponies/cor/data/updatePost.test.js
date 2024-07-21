import updatePost from "./updatePost.js";

const post = {
    id: "pnh3hr39ljk",
    image: "https://external-preview.redd.it/Y83mJkx7js__wYUkI56EXa6JA5TECWZZ4qWzlqecUBw.jpg?auto=webp&s=f1e4b4b2c55e3433480dce4387451acf89a541bd",
    caption: "",
    author: "maxPower",
    date: "2024-06-28T09:45:32.556Z",
    likes: [
            "cauliFlower"
        ]
}


updatePost(postToUpdate => postToUpdate.id === post.id, post, (error) => {
    if (error) {
        console.error(error);
        return;
    }

    console.log('post updated');
});
