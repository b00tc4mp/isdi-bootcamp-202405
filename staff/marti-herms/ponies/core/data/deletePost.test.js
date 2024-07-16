import deletePost from './deletePost.js'

const post = {
    id: '11111111111',
    img: 'https://media.giphy.com/media/Y6FUCFt5N7Y8gRSInL/giphy.gif?cid=790b7611n4je3gl88mi1ckmoc334pep8shbrhi9bpz2g64w5&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    caption: 'no cofee',
    author: 'samu',
    date: '2024-07-09T07:03:57.328Z',
    likes: ['samu']
}

deletePost(_post => post.id === _post.id)