# The V-HUB

A hub for gamers and developers to play or upload videogames

![V-Hub image](./images/preview.webp)

## Functional

### Use Cases

User
- add game to library/favourites
- search game
- select/play game

Dev User
- post game to site

### UIUX Design

[Figma](https://www.figma.com/files/team/1381930055088856376/project/256028731/Project?fuid=1381930053009727034)

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
- role (string)
- library ([Game.id])

Game
- id (string)
- name (string)
- image (string)
- link (string)
- downloads (number)