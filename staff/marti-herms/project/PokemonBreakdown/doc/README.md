# Pokemon Breakdown

A game to build pokemon teams and fight with them

![Pokemon image](https://media.giphy.com/media/Ml9qdzetfukLi7kCai/giphy.gif?cid=790b76112j9m649d1ezvbunwxado0yph46f46wyqdajfn0kr&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

**User**
*V.01*
- create Pokemon team
- edit Pokemon team
- add pokemon to team
- remove pokemon from team
- edit pokemon from team
- import pokemon from text
- export pokemon from text

**User**
*V.02*
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

**User**
- id (auto)
- email (string)
- username (string)
- password (string)
- avatar (string)
- role (string)
- library ([Game.id])

**Team Library**
- id (auto)
- owner (User.id)
- teamList ([Team.id])
- privacy (boolean/string)

**Team**
- id (auto)
- name (string)
- author (string)
- pokemonList ([Pokemon])
- date (Date)

**Pokemon**
- _id (auto)
- id (number)
- name (string)
- level (number, enum: 1-100)
- type ([{Type.id}])
- item (string)
- moves ([Move])
- possibleMoveset ([Move.id])
- stats (object)
- nature (string)
- statusCondition (string)

**Move**
- id (auto)
- name (string)
- accuracy (number)
- damageClass (string)  
- effectChance (number)
- effect (string)
- meta ({
            - ailment (string, optional)
            - ailment_chance (number, optional)
            - category (string, optional)
            - crit_rate (number, optional)
            - drain (number, optional)
            - flinch_chance (number, optional)
            - healing (number, optional)
            - max_hits (number, optional)
            - max_turns (number, optional)
            - min_hits (number, optional)
            - min_turns (number, optional)
            - stat_chance (number, optional)})
- power (number)
- powerPoints (number)
- priority (number)
- statChanges ([{
            - change (number)
            - stat (string)    }])
- target (string)
- type (string)

**Status Condition**
- actualCondition ()
- burn (Burn)
- freeze (Freeze)
- sleep (Sleep)
- paralysis (Paralysis)
- poison (Poison)
- badlyPosioned (BadlyPosioned)