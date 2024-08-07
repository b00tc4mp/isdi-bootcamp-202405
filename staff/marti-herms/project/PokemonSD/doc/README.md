# Pokemon Breakdown

A game to build pokemon teams and fight with them

![Pokemon image](https://media.giphy.com/media/Ml9qdzetfukLi7kCai/giphy.gif?cid=790b76112j9m649d1ezvbunwxado0yph46f46wyqdajfn0kr&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

As a pokemon player, there is a lot of resources to design teams and practice without using the original games, but there isn't a unified resource. Pokemon Breakdown aims to accomplish that, starting with the basics and tacking example from Pokemon Showdown, which is the biggest resource right now.

### Use Cases

V.01
- create Pokemon team
- edit Pokemon team
- add pokemon to team
- remove pokemon from team
- edit pokemon from team
- import pokemon from text
- export pokemon from text

V.02
- find battle
- select move
- cancel move
- exit battle

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
- id (auto)
- email (string)
- username (string)
- password (string)
- avatar (string)
- role (string)
- library ([Game.id])

Team Library
- id (auto)
- owner (string)
- teamList ([string])
- privacy (boolean/string)

Team
- id (auto)
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
- id (auto)
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