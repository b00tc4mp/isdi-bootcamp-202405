# Pokemon Warfare

A game to build pokemon teams and fight with them

![Pokemon image](./images/)

## Functional

### Use Cases

[?]

### UIUX Design

[Figma]()

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
- email (string)
- username (string)
- password (string)
- avatar (string)
- role (string)
- library ([Game.id])

Team Library
- id (string)
- owner (string)
- teamList ([string])
- privacy (boolean/string)

Team
- id (string)
- name (string)
- author (string)
- pokemonList ([Pokemon])


Pokemon
- id (number)
- name (string)
- level (number)
- type1 (string)
- type2 (string)
- gender (string)
- shiny (boolean)
- item (string)
- ability (string)
- move1 (Move.id)
- move2 (Move.id)
- move3 (Move.id)
- move4 (Move.id)
- possibleMoveset ([Move.id])
- stats (Stats)
- nature (string)
- statusCondition (string)

Stats
- hp (Stat)
- finalHp (number)
- attack (Stat)
- finalAttack (number)
- defense (Stat)
- finalDefense (number)
- spAttack (Stat)
- finalSpAttack (number)
- spDefense (Stat)
- finalSpDefense (number)
- speed (Stat)
- finalSpeed (number)

Stat
- base (number)
- efforValues (number)
- individualValues (number)

Move
- id (number)
- name (string)
- accuracy (number)
- pp (number)
- power (number)
- priority (number)
- type (number)
- damageType (string)
- ailment (string)

StatusCondition
- actualCondition ()
- burn (Burn)
- freeze (Freeze)
- sleep (Sleep)
- paralysis (Paralysis)
- poison (Poison)
- badlyPosioned (BadlyPosioned)

Burn