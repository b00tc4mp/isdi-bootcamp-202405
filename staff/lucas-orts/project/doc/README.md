# From Farm To Hand


Aplicación que permite ver los agricultores ecológicos cerca de tu zona así como todos los productos(frutas y verduras), que tiene cada un de los agricultores


![Eco Image](https://ojeandolaagenda.com/wp-content/uploads/2010/07/logo.png)


## Functional
La aplicación permitirá que los agricultores puedan añadir/eliminar sus frutas y verduras además de la ubicación donde puedes encontrarlos. Por otro lado permitirá que los usuarios puedan localizar a los agricultores según las siguientes especificaciones que decidan: 
- Distancia
- Productos introducidos
Por último tendremos un administrador que podrá registrar agricultores así realizar el mismo procedimiento que un agricultor seleccionando el que desea cambiar sus datos


### Use Cases


Non registered User/Registered Farmer
- Search by geo and distance and name and type near products
- View product detail


Farmer
- Add product
- Modify product
- Modify location
- Delete product
- List products
- Modify contact info


### UIUX Design


[Figma](https://www.figma.com/design/xTULdaTftydp4n5jZp5CHq/Untitled?node-id=0-1&t=0gE7FG19oIyNOIqJ-0)


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
- phone (string)
- address (string)
- password (string)
- location ([number, number])


Product
- id (string)
- farmer(User.id)
- name (string)
- type(string, optional)
- image(string)
- location ([number, number])
- enabled (boolean, default true)