# Ponies

lorem ipsum ...

![Pony Image]('https://i.pinimg.com/564x/f6/21/64/f621641d5082d74385fabb5c2afb62f5.jpg')

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

<!-- [Figma] MODIFICAR FIGMA -->

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
- following ([User.username])

Post
- id (string)
- author (User.username)
- image (string)
- caption (string)
- date (Date)
- likes ([User.username])