<br />
<div align="center">

  <h3 align="center">:sparkles:Sistemas Distribuidos: Tarea 03:sparkles:</h3>

  <p align="center">
    :sparkles:Lucas Almonacid y Benjamín Fernández:sparkles:
  </p>
</div>

## :boom: Descripción

En este presente repositorio se almacena la tarea 3 de sistemas distribuidos y se explica la instalacion junto con informacion necesaria para entender el sistema implementado.

### 🛠 Construído con:


* [Node.js](https://nodejs.org/es/)
* [Apache Cassandra](https://cassandra.apache.org)
* [Docker](https://www.docker.com)

## :shipit: Instalación

En primer lugar, se debe de tener claros los pre-requisitos, estas son:

### Pre-Requisitos

Tener Docker y Docker Compose instalado
* [Installation Guide](https://docs.docker.com/compose/install/)

### Primeros pasos

Después de haber descargado los archivos del git (usar técnica que más le acomode), se debe de ubicar en la terminal de su SO en la carpeta correspondiente a la aplicación y aplicar el comando:
```curl
docker-compose up
```
Al iniciar la aplicación se podrá acceder al cliente en localhost:8080, en este se realizaran los post via un json. Se aplicara un create, update, delete y se implemento un insert_example para que este creara recetas y asi poder ejemplificar mejor el update y el delete.

* Create

```curl
localhost:8080/create
```
![image](https://user-images.githubusercontent.com/90724923/173257422-05daa940-83f6-4122-a8fe-d984a2faf838.png)

* Insert examples

```curl
localhost:8070/insert_example
```
![image](https://user-images.githubusercontent.com/90724923/173257443-612e56c1-751b-4550-8021-acde2e69b53f.png)

* Update

```curl
localhost:8070/insert_example
```
![image](https://user-images.githubusercontent.com/90724923/173257459-2ff87cc1-dee8-40da-9f68-464187bc08bd.png)

* Delete

```curl
localhost:8070/insert_example
```
![image](https://user-images.githubusercontent.com/90724923/173257473-f63d53fc-17ea-49b2-bce5-bbd5fa40bdea.png)

Cabe decir para las ID se utilizo el tipo de dato UUID debido a que se encontro más apropiado usar este elemento en los casos que se ocupan ID, ya que este genera un elemento azaroso que es casi unico.

# Analisis

