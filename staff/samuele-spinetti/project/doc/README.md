# QueerCare
## Empowering LGBTQI+ Health and Wellness

QueerCare is a comprehensive web application dedicated to promoting sexual health and overall wellness within the LGBTQI+ community. Our mission is to provide a supportive, inclusive, and informative platform where individuals can access a wealth of resources, manage their health proactively, and connect with a community of like-minded individuals. By addressing the unique health challenges faced by LGBTQI+ people, QueerCare aims to foster a sense of empowerment, knowledge, and solidarity.

##### Our Mission
We understand that the LGBTQI+ community encounters distinct challenges and barriers when it comes to accessing quality health care and information. Our mission is to bridge this gap by offering a dedicated space that prioritizes the health and well-being of LGBTQI+ individuals. We believe in a holistic approach to health that encompasses physical, mental, and emotional well-being. 

IF YOU CAN'T LOVE YOURSELF, HOW THE HELL YOU GONNA LOVE SOMEBODY ELSE!

![QueerCare Image](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGFzNDljMWF6YTRkZDJ3OHllajJ6OHgyZjV1cjE1YjNuZ3M0cTRncyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8BliXi8qqCgSk2SZg6/giphy.webp)

## Functional

Our intuitive and accessible design ensures that users of all technical abilities can easily navigate the platform.
A vibrant and inclusive design reflects the diversity and spirit of the LGBTQI+ community.
- Secure User Authentication:
Robust registration and login systems protect user data with secure authentication protocols.

- Comprehensive Health Resources:
A curated collection of articles, videos, and interactive content covers a wide range of topics related to sexual health, mental health, and wellness.

- Interactive Community Support:
A safe and moderated forum where users can share experiences, seek advice, and offer support.

- Access to Health Professionals:
Directories and contact information for LGBTQI+-friendly healthcare providers and specialists.

### Use Cases

User
- View latest news about sexual health
- Search for LGBTQI+ friendly healthcare provider
- Publish a post in the QCC(QueerCareCommunity)
- Delete a post in the QCC
- Add comment to a post in the QCC
- Delete your own comment from a post
- Toggle like a post in the QCC
- Change personal informations
- Search HealthCare providers 

### UIUX Design

[Figma](https://www.figma.com/design/Ahia0GosIeRkWOiWlOU96j/Project-QueerCare?node-id=0-1&t=nreOjKGTeidbWb3F-0)

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

- HTML / CSS / JS
- Node
- Express
- React
- Mongo
- Tailwindcss

### Data Model

User
- id (auto)
- name (string)
- surname (string)
- email (string)
- username (string)
- password (string)
- favs([News.id])

HealthCenter
- id (auto)
- name (string)
- address (string)
- openingHours (string)
- contactInfo (string)
- geoLocalization (string)

Post
- id (auto)
- author (User.id)
- caption (string)
- date (Date)
- likes ([User.id])

Comment 
- id (auto)
- text (string)
- author (User.id)
- post (Post.id)
- date (Date)

