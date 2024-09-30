# + VIBES

+Vibes is an application designed to help you find personal growth events based on your location. With an intuitive interface, you can explore a wide variety of events, view specific details, create your own events, book your spot directly from the app and  save your favorite events for quick and easy access.

![+Vibes Image](https://media.giphy.com/media/kI0mZhnqikAgg/giphy.gif?cid=ecf05e47rxe3uubfpsio4br6jcqh7gzt10llwhpglt3ppek3&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

- Explore events: Browse through an updated list of personal growth events.

- Search Events: Use the search function to find events closest to your location or any specified location. Events are displayed pon an interactive map and in a list for easy viewing and selection

- Favorites: Save your favorite events for easy access and receive notifications when there are new events from this same organizer.

- Event details: Check the duration, price, and other relevant information for each event. 


### Use Cases

User
- search events by location
- view event details
- toggle like event
- view likes events 
- create new event
- update event
- delete event
- toggle assist event
- view attending events


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
- Mongo / Mongoose
- React Router
- TailwindCSS
- JWT
- Bcrypt

### Data Model

User
- id (auto)
- name (string)
- surname (string)
- email (string)
- username (string)
- password (string)
- likes ([Event.id])

Event
- id (auto)
- author (User.id)
- title (string)
- date (Date)
- duration (string)
- description (string)
- image (string)
- location ([number, number])
- address (string)
- city (string)
- attendees ([User.id])

## Next Version

- search meditations
- receive daily affirmations
- talk to other users
- book a place

