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

Cassandra debe poder tolerar fallos en casos que alguna parte del sistema falle y poder establecer comunicación estre todos sus nodos, por esto mismo se utiliza una arquitectura Peer To Peer, además de que esto ayuda a su escalabilidad. Los nodos deben ser iguales y su comunicacion se logrará gracias al sistema P2P con el protocolo Gossip, ya que este sirve para el intercambio de informacion entre los nodos. Para mantenar la consitencia entre los datos se realizan Logs de los commits de cada nodo cuando se quiere escribir en estos, así se logra mantener consistencia de los datos. Cabe decir que la arquitectura de cassandra no sigue el modelo de maestro-esclavo, como se dijo antes, todos los nodos son iguales.

<center>
  
  ![image](https://user-images.githubusercontent.com/90724923/173517768-e7533c0c-e1f5-4e48-9106-c47a3f980068.png)

</center>

Si vemos la imagen adjunta, se puede imaginar a cassandra como un anillo donde multiples nodos estan conectados, donde los nodos deberian de tener cada uno una particion de cada tabla de la base de datos y estos solo se pueden comunicar con los adyacentes. En caso de que algun nodo se caiga, mediante el protocolo Gossip se deberia dar a conocer a todos los nodos de la red que no se encuentren caidos de la falta de este nodo. La forma de la cual los nodos son concientes de los otros es mediante la constante actualizacion que imparte el protocola ya mencionado, ya que este intercambia informacion hasta con tres nodos en un mismo cluster, logrando asi mantener a la red informada y en sincronia.

Los nodos funcionan mediante ciertos elementos que le ayudan a trabajar con los datos como el commit log, el memTable y el SSTable. El commit log es un fichero donde se almacena la informacion sobre cambios hechos en los datos, por lo tanto sirve para realizar respaldos en el sistema en caso de fallos. La MemTable es un almacenamiento en memoria que contiene datos que aun no han sido guardados en la SSTable. La SSTable es el fichero que almacena todos los datos en disco, estos son inmutables una vez creados.

Cuando un cliente hace una peticion de lectura, el nodo al cual esta consultado el cliente actua como el coordinador entre éste y el resto de los nodos donde se encuentran los datos a buscar mediante la consulta del clientre. El coordinador debe ser capaz de determinar que nodo será el que respondera a la consulta. En caso de que el cliente quiera realizar escritura sigue habiendo un nodo coordinador, el cual es el que esta conectado el cliente, que va a ver a coordinar que nodos participaran en esta peticion. Los datos primero pasaran por la MemTable, para despues ser almacenados en disco en SSTable. No hay que olvidar que existe un componente importante en la arquitectura de cassandra llamada Partitiones, el cual determina como se van a distribuir los datos entre los nodos, como las copias que hara el sistema.

En los casos en que un nodo se desconecte, la red será alertada mediante el protocolo Gossip el cual, como se dijo antes, mantiene actualizada toda la red con los cambias que esta va teniendo. El *Replica placement strategy* define la estretegia a seguir para realizar copias de los datos en diferentes nodos, asi se asegura accesibilidad con respecto a los datos y teleracia a fallos. Tambien existe el *Snitch*, el cual define las estrategias de replicacion y la forma de dirigir las consultas de manera eficiente. Por lo tanto en caso de que se cayera un nodo, la red será alertada por el protocolo Gossip y no deberia de haber fallos en la red ya que cassandra tiene previsto sistemas para la tolerancia a fallos como *Replica placement strategy* y *Snitch*.

Para saber si la red generada es eficiente se debe de ser conciente de que cassandra no se ocupa para dar solucion a cualquier base de datos, ya que cassandra fue creada para el uso de grandes cantidades de datos, debido a que este fue creado con la finalidad de realizar busquedas de forma cómoda en una base de datos de gran tamaño. La arquitectura de cassandra, pese a que este hecha para una gran cantidad de datos como fue dicho, mientras mas nodos existan, mas dificil será mantener el sistema debido a que se deberan realizar mas procesos, como es el caso del Gossip que debe mantener a toda la red informada sobre los estados de los nodos. Por lo tanto, no siempre es eficiente, solo cuando se tiene mucho poder de procesamiento, ram y una gran cantidad de datos como para utilizar bien este sistema.

Con respecto al balanceo de carga...


* Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para en el caso actual y por qué? Justifique apropiadamente su respuesta.


* Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre cuando se quiere escalar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la replicación/distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.
