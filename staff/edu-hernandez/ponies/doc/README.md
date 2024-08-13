
![logo_cities 1](https://github.com/user-attachments/assets/67f8e7ba-74d7-4453-8fa6-f0ad7a69f7af)

<h2 align="left"> FUNCTIONAL </h2>

The project will try to help better manage the leisure time of our users, offering relevant information in real time to make the best decisions when choosing where to go, both day and night. Among the functions we should highlight the capacity in real time, ticket prices, in case you have to pay, the theme of the event, duration and more generic information about the event. The real-time mode will not be entirely accurate at the moment because to implement the 'in-real-time-mode' model requires many users with the app installed on their device, so it will be a future feature. Cities has all kinds of information about events in the city so that you can enjoy the events in the city, both well-known events as well as those that are very local or even organised by neighbours of a street. The information is taken from official sources, specialised event accounts on the most popular social networks, neighbourhood party groups and commercial hubs in all the city's neighbourhoods.

<h2 align="left"> USE CASES </h2>

Create Event: Users can create events to share information about or share their experiences.

Events List: Users can view a comprehensive list of available events, filtering by category, location, and date.

List Saved Events: Users can save events for future reference and view a list of their saved events.

Toggle Going to Event: Users can indicate whether they plan to attend a specific event, enabling them to receive notifications related to that event.

Toggle Like Event: Users can like events, helping highlight the most popular events in the app.

Toggle Follow User: Users can follow specific profiles to receive updates and changes about them.

<h2 align="left"> USER </h2>

- create event.
- Lists events.
- List events saved.
- toggle going to event.
- toggle like event.
- toggle follow profile username.

<h2 align="left"> UI | UX DESIGN </h2>

[Figma](https://www.figma.com/design/2Jqh5rduEoNJAEK8olefch/cities-%7C-project?node-id=0-1&t=SdWvjTUZBZDr1jqC-1)

<h2 align="left"> TECHNICAL </h2>

<h3 align="left"> BLOCKS </h3>
The project is divided into several key components:

- App (User Interface): The client application where users interact.
- API (Core Logic): The API that handles the main logic and serves data to the app.
- DB (Data Storage): Database for persistent data storage.

<h2 align="left"> PACKAGES </h2>

<h4 align="left"> The project is organized into the following packages: </h4>

- api (server)
- cor (core logic dependency to api)
- com (common dependencies to api and app)
- app (client)
- doc (project documentation)

<h2 align="left"> TECHNOLOGIES </h2>

- HTML / CSS / JS
- Node
- Express
- React
- Tailwind
- Mongo
- Data Model

![Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Badge](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Badge](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)

<h2 align="left"> DATA MODEL </h2>

- id (string): Unique identifier for the user.
- email (string): User's email address.
- username (string): Profile username.
- password (string): User's password (stored securely by method 'hash').
- profile (string): URL or path to the user's profile image.

<h2 align="left"> EVENTS </h2>

- id (string): Unique identifier for the event.
- author (User.id): ID of the user who created the event.
- image (string): URL or path to the event image.
- caption (string): Description or comment of the event.
- date (Date): Date and time of the event.
- going ([User.id]): List of IDs of users pretneding go to the event.
- likes ([User.id]): List of IDs of users who have liked the event.

![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)
