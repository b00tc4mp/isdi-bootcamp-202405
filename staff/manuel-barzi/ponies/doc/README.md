# Ponies

lorem ipsum ...

![Pony Image](https://media.giphy.com/media/8gagdpcAhA8AuVerUn/giphy.gif?cid=790b7611jc6mx4hntg3ddlkj4jcm5l4t0ul8stuw2mygm2ji&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

User
- create post
- list posts
- list ponies posts
- list saved posts
- toggle like post
- toggle fav post
- toggle follow user
- update post
- delete post

### UIUX Design

[Figma](https://www.figma.com/design/7ohsVM69EEKTn7TiG5yWTb/ponies?node-id=0-1&t=U6MSAuJNfld3IeuT-0)

## Tecnical

### Blocks

- App (user interface)
- API (core logic)
- DB (data storage)

### Packages

- api (server)
- cor (core logic dependency to api)
- com (common dependencies to api and app)
- app (client)
- doc (project documentation)

### Technologies

- HTML / CSS  / JS
- Node
- Express
- React
- Mongo

### Data Model

User
- id (string)
- name (string)
- surname (string)
- email (string)
- username (string)
- password (string)
- avatar (string)
- favs ([Post.id])
- following ([User.id])

Post
- id (string)
- author (User.id)
- image (string)
- caption (string)
- date (Date)
- likes ([User.id])