# Scene

Scene is an application designed to connect musicians, bands, concert venues, promoters, and record labels within the underground scene. The primary objective is to create and promote concerts, as well as to facilitate networking and connections among the various participants in the music scene.


![Scene Image](https://media.giphy.com/media/39DV0pT9v42Fq/giphy.gif?cid=ecf05e47m4kzmaq2wr3vcwdlfcfo7fgconr1yjonyfor0zy7&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

The application offers a platform for different user profiles to interact, collaborate, and stay informed about musical events through:

- An interactive calendar where events can be viewed, created, modified, and deleted.

- A search tool to find events by date, geolocation, band, or music genre.

- A directory for each role within the app, allowing users to connect with them or send messages.

### Use Cases

User
- Create post
- List posts
- Modify post
- Delete post
- Add comment in a post
- Delete comment in a post
- Show event calendar
- Create event
- List events
- Search event
- Update event
- Delete event
- Follow user
- Search user
- List following users
- List bands
- List venues
- List promoters
- List labels
- Toggle like post
- Toggle fav post
- Send messages

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

User 
- id (auto)
- name (string)
- username (string)
- role (string, enum: regular | band | label | promoter | venue)
- email (string)
- password (string)
- avatar (string)
- messages ([User.message])
- favs ([Post.id])
- following ([User.username])
- events ([Event.id])

Band
- id (auto)
- name (string)
- username (string)
- role (string)
- music genre (string)
- email (string)
- password (string)
- avatar (string)
- messages ([User.message])
- favs ([Post.id])
- following ([User.username])
- events ([Event.id])

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

Comment
- id (auto)
- text (string)
- author (User.id)
- post (Post.id)
- date (Date)


