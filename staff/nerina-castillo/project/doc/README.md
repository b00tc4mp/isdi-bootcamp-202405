# Scene

Scene es una aplicación diseñada para conectar músicos, bandas, salas de conciertos, promotoras y sellos discográficos del ámbito underground. El objetivo principal es la creación y promoción de conciertos, así como la facilitación y creación de redes entre los distintos participantes de la escena musical.
La aplicación ofrece una plataforma para que los distintos perfiles de usuario interactúen, colaboren y se mantengan informados sobre los eventos musicales, gracias al buscador que permite al usuario buscar eventos ya sea por localización, por género musical, por banda o por fecha.

![Scene Image](https://media.giphy.com/media/39DV0pT9v42Fq/giphy.gif?cid=ecf05e47m4kzmaq2wr3vcwdlfcfo7fgconr1yjonyfor0zy7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

Users / Bands / Venues / Promoters / Labels
- create post
- create event
- list following users
- list events
- list bands
- list venues
- list promoters
- list labels
- toggle like post
- toggle fav post
- toggle follow user
- update post
- delete post
- search event
- update event
- delete event
- send messages

### UIUX Design
[Figma](https://www.figma.com/design/ENeHGUGHQy8gNxY00fCLsa/Untitled?node-id=1-710&t=TEnsDeO22H759zz5-0)

## Technical

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

User / Promoter / Label / Venue
- username (string)
- user profile (string)
- email (string)
- location (string)
- password (string)
- avatar (string)
- messages ([User.message])
- favs ([Post.id])
- following ([User.username])
- event ([Event.id])

Band
- username (string)
- user profile (string)
- music genre (string)
- email (string)
- location (string)
- password (string)
- avatar (string)
- messages ([User.message])
- favs ([Post.id])
- following ([User.username])
- event ([Event.id])

Post
- id (string)
- author (User.username)
- image (string)
- caption (string)
- date (Date)
- likes ([User.username])

Event
- id (string)
- author (User.username)
- location (string)
- schedule (Date)
- description (string)
- date (Date)
- likes ([User.username])


