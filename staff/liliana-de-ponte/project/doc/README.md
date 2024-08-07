# + VIBES

This app allows you to discover and participate in upcominmg personal growth events in the city. With an intuitive interface, you can search for events, save then as favorites, view details such as duration and price, and book you spot directly from the app. 

![+Vibes Image](https://media.giphy.com/media/kI0mZhnqikAgg/giphy.gif?cid=ecf05e47rxe3uubfpsio4br6jcqh7gzt10llwhpglt3ppek3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

![+Vibes Image](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTQ1cmt1azNtY291N3VpNWFubGkyMTloZ29vZ29vcGRncnIyYnJqayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ta2eHM043vhVS/giphy.gif)


## Functional

- Explore events: Browse through an updated list of personal growth events.
- Search Events: Use the search function to find events closest to your location.
- Favorites: Save your favorite events for easy access and receive notifications when there are new events from this same organizer.
- Event details: Check the duration, price, and other relevant information for each event. 
- Book Spot:  Reserve your spot for events directly from the app.

### Use Cases

User
- Explore and search events
- Save favorites
- View events details
- Book yor spot
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
