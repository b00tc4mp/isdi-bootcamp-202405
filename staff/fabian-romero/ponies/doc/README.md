# RAYO!

![Rayo Image](https://media.tenor.com/M3NNZHZDkBkAAAAi/book-marina-lopes.gif)

This app is about two users, two roles, the investor and the project. In this app, an investor searches for a project to invest and clicks on the "like button". 
When the project user likes the investor's like button, a match occurs, in which the data of both will be revealed. between them to get in touch.

# Ratch!
![Ratch Image](https://media1.tenor.com/m/1nPxJvOhTHUAAAAC/its-a-match-dean-martin.gif)

## Functional

This app offers the types of users projects, show a project looking for investors and the investor users see different projects in which they can invest

## Use Cases


User



### UIUX Design
[Figma](https://www.figma.com/design/qo9bSmKcNGI09Po46514dm/Untitled?node-id=0-1&t=NxFXHzicai1qauHD-0)


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
- id (auto)
- name (string)
- surname (string)
- role (string, enum: project / investor)
- email (string)
- phone Number(number)
- password (string)
- avatar (string)
- messages ([User.message])
- favs ([Post.id])
- following ([User.id])

Post
- id (string)
- author (User.id)
- image (string, optional)
- text (string)
- date (Date)
- likes ([User.id])



Comment
- id (auto)
- text (string)
- author (User.id)
- post (Post.id)
- date (Date)

