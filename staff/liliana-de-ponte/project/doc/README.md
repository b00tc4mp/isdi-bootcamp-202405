# + VIBES

Esta aplicación tiene como objetivo ayudarte a descubrir y participar en eventos de crecimiento personal, buscar meditaciones y configurar afirmaciones motivacionales para recibirlas tantas veces como desees en el día.


te proporcionará los proximos eventos que pueden ayudarte a mejorar tu bienestar empocional. 


![+Vibes Image](https://media.giphy.com/media/kI0mZhnqikAgg/giphy.gif?cid=ecf05e47rxe3uubfpsio4br6jcqh7gzt10llwhpglt3ppek3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

![+Vibes Image](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTQ1cmt1azNtY291N3VpNWFubGkyMTloZ29vZ29vcGRncnIyYnJqayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ta2eHM043vhVS/giphy.gif)


## Functional

### Use Cases

User
- Listado de proximos eventos
- Guardar los eventos favoritos
- Buscar meditaciones
- Recibir afirmaciones diarias
- Hablar con otros usuarios


### UIUX Design

[Figma](https://www.figma.com/design/Z1thFQy3HCx7CshtoLE4vG/Untitled?node-id=0-1&t=JkDvy4epMVC3RFj8-0)

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


Post
- id (string)
- author (User.username)
- image (string)
- caption (string)
- date (Date)
