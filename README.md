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
Es normal que la aplicación demore mucho en iniciar, esto es debido a que cassandra debe habilitar todos sus nodos y de por si esto demanda un gran poder de procesamiento y de ram.

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

# Preguntas y analisis

* Explique la arquitectura que Cassandra maneja. Cuando se crea el clúster ¿Cómo los nodos se conectan? ¿Qué ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta? ¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?

Cassandra debe poder tolerar fallos en casos que alguna parte del sistema falle y poder establecer comunicación estre todos sus nodos, por esto mismo se utiliza una arquitectura Peer To Peer, además de que esto ayuda a su escalabilidad. Los nodos deben ser iguales y su comunicacion se logrará gracias al sistema P2P con el protocolo Gossip, ya que este sirve para el intercambio de informacion entre los nodos. Para mantenar la consitencia entre los datos se realizan Logs de los commits de cada nodo cuando se quiere escribir en estos, así se logra mantener consistencia de los datos.
<div align="center">
  ![image](https://user-images.githubusercontent.com/90724923/173517768-e7533c0c-e1f5-4e48-9106-c47a3f980068.png)

  
</div>


* Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para en el caso actual y por qué? Justifique apropiadamente su respuesta.


* Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre cuando se quiere escalar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la replicación/distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.
