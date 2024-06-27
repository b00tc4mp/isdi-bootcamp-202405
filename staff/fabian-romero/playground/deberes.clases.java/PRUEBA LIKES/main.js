const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');

let likes = 0;
let isLiked = false;

likeButton.addEventListener('click', () => {
    isLiked = !isLiked;

    likes += isLiked ? 1 : -1;

    likeCount.textContent = `${likes} Likes`;

    if (isLiked) {
        likeButton.classList.add('liked');
    } else {
        likeButton.classList.remove('liked');
    }
});
