# Exoticus

Exoticus is an application where you can contact the nearest exotic pet daycare centers to take care of your pets when you need it.

https://static.wikia.nocookie.net/simpsonstappedout/images/1/19/Pokey1.JPG/revision/latest?cb=20140331223842



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
 - settings page

**User**
 - show main info
 - list petsitters
 - show petsitter's detaill
 - show contact page
 - send message
 - settings page

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
 - name (string)
 - email (string)
 - city (string)
 - password (string)
 -  description (string)
 - image (string)
 - rating (float)
 
 **Reviews**
  - user id (auto)
  - petsitter id (string)
  - ratting (interer)
  - message (string)

**User**
 - id (auto)
 - name (string)
 - surname (string)
 - email (string)
 - password (string)
 - role [petsitter or user] (string)

