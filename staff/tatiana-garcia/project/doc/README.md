# Exoticus

Exoticus is an application where you can contact the nearest exotic pet daycare centers to take care of your pets when you need it.

![EXOTICUS](https://media.giphy.com/media/ONuQzM11fjvoY/giphy.gif?cid=ecf05e475j7clctrmssxibvl9fej7hl9ga50ln8j2z1f89w9&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases
**Anonimous Users**
 - show main info
 - list petsitters
 - show petsitter's detaill
 - show contact page
 
 **Petsitter user**
  - show main info
 - list petsitters
 - show petsitter's detaill
 - show contact page

**User**
 - show main info
 - list petsitters
 - show petsitter's detaill
 - show contact page
 - add review

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

**Petsitter**
 - id (auto)
 - userId(auto)
 - name (string)
 - email (string)
 - city (string)
 - password (string)
 -  description (string)
 - image (string)
 - rating (float)
 
 **Reviews**
  - id (auto)
  - userId (auto)
  - petsitterId (auto)
  - ratting (interer)
  - message (string)

**User**
 - id (auto)
 - name (string)
 - surname (string)
 - email (string)
 - password (string)
 - role [petsitter or user] (string)

