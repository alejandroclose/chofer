# Chofer
Proyecto de modulo 2 de Part Time Full Stack Web Development Bootcamp en Ironhack Barcelona 08/2018. Aplicación para comparar servicios para desplazarte por la ciudad.

## Description

Aplicación para comparar servicios de transporte para desplazarte por la ciudad y poder seleccionar la opcion que mas se adapte a tus necesidades.
 
 ## User Stories

List of user stories in order of priority/importance.

Example:
 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
 - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
 - **homepage** 
 - **sign up** La persona se dara de alta como usuario 
 - **login** El usuario podra acceder a su cuenta y le va a permitir hacer mas funciones.
 - **logout** El usuario de saldra de su cuenta 
 - **trips** - Como usuario tendras un mapa y podras indicar la ruta que quieres hacer seleccionando origen y destino del viaje. Se muestra el coste de cada servicio disponible y seleccionalo para ver detalles de las tarifas para ese viaje y seleccionar el viaje.
 - **historial de busquedas** Cada viaje seleccionado se guarda y puedes ver el registro de todos los viajes realizados.
 - **preferencias de servicio** - Podras elegir entre los servicios disponibles , como taxi , uber, cabify, ecooltra etc.
 - **ver mapa** Tendra un mapa donde el usuario podra ver la ruta que ha seleccionado

## Backlog

List of other features outside of the MVPs scope

Perfil:
- editar
- cambiar contraseña

Mapa
- Api mapbox



## ROUTES:
```
GET / 

GET /auth/signup
POST /auth/signup - POST Body: name, e-mail, password
GET /auth/login
POST /auth/login - POST Body: e-mail, password
POST auth/logout - POST Body: nothing

GET /user/profile
GET /user/profile/edit
GET /user/trips
POST /user/trips/add - POST Body: id_usuario, origen, destino,kilometros, servicio, coste, fecha_creacion,fecha_modificacion
GET /user/trips/:id
GET /user/trips/edit/:id
POST /user/trips/delete/:id

GET /prices
```

## MODELS

```
Tarifas
 - coste inicial: number
 - lavorable: number
 - weekend: number
 - aereopuerto: number
 - maletas: number
 - festivo: number

```    
```
viajes 
 - Usuario: String
 - Origen: String
 - Destino: String
 - Data: Date
 - Servicio: String
 - Coste: Number
 - Fecha creacion : Date
 - Fecha modificacion : Date
```    
 
```
User
 - id: _id
 - username: String
 - password: String
```

## Links

### Trello
https://trello.com/b/2RuyD3jV/web-dev

### Git

https://github.com/alejandroclose/chofer



### Slides.com

https://slides.com/perebusquet
