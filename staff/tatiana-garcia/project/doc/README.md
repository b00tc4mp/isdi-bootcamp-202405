# Exoticus

Exoticus is an application where you can contact the nearest exotic pet daycare centers to take care of your pets when you need it.

![EXOTICUS](https://media.giphy.com/media/ONuQzM11fjvoY/giphy.gif?cid=ecf05e475j7clctrmssxibvl9fej7hl9ga50ln8j2z1f89w9&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases
**Anonimous Users**
 - list petsitters by city and animal
 - view petsitter's detail
 - view admin contact
 
 **Petsitter user**
 - list petsitters by city and animal
 - view petsitter's detail with contact info
 - view admin contact 
 - update own details
 - unregister

**Regular user**
 - list petsitters by city and animal
 - view petsitter's detail with contact info
 - view admin contact
 - add review to petsitter
 - update own details
 - delete review from petsitter
 - unregister

### UIUX Design

[Figma](https://www.figma.com/design/A9qXoEbUGl258DXtERKh40/Untitled?node-id=0-1&t=7FmmZaRi3wCYhaF2-0)

## Tecnical

### Blocks
- App (user interface)
- API (core logic)
- DB (data storage)
- 
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
- 
### Data Model

**User**
 - id (auto)
 - name (string)
 - surname (string, optional)
 - email (string)
 - phone (string, optional)
 - city (string, optional)
 - password (string)
 -  description (string, optional)
 - image (string, optional)
 - role ( string, enum: petsitter or regular)
 - animals([string], optional)
 
 **Review**
  - id (auto)
  - author (User.id)
  - petsitter (User.id)
  - rate (number)
  - date (Date)
  - message (string)