'use strict';

const express = require('express');
const axios = require('axios')
const bp = require('body-parser')
const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

//const cors = require("cors");
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const client = new cassandra.Client({
  contactPoints: ['cassandra-node1', 'cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'password123'),
  keyspace: 'medic_1'
});

const client_2 = new cassandra.Client({
  contactPoints: ['cassandra-node1', 'cassandra-node2','cassandra-node3'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'password123'),
  keyspace: 'medic_2'
});

// App
const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Tarea 3 Sistemas Distribuidos');
});



//(async () => {
  //await client.execute("INSERT INTO pacientes (id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?);",["f7a13005-31db-4fea-a064-50bb832c0870","Test","Prueba","2","test@mail.com","0"]).then(result2 => {console.log('Result ' + result2);}).catch((err) => {console.log('ERROR:', err);});
  //await client_2.execute("INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);",["40c74ccd-a5aa-4650-9459-d84e8edfdfcf","f7a13005-31db-4fea-a064-50bb832c0870","Test","Prueba","Alguien"]).then(result2 => {console.log('Result ' + result2);}).catch((err) => {console.log('ERROR:', err);});
//});
app.post('/create', (req, res) => {
  (async () => {
    const query = 'SELECT * FROM pacientes WHERE rut=? ALLOW FILTERING';
    const query2 = "INSERT INTO pacientes (id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?);";
    const query3 = "INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);";
    const receta = req.body;
    var gen_id_1 = uuidv4();
    var gen_id_2 = uuidv4();
    console.log("Receta: ",receta)
    console.log("ID gen para Paciente: ",gen_id_1)
    console.log("ID gen para Receta: ",gen_id_2)

    await client.execute(query,[receta.rut]).then(result => {
      console.log('Result ' + result.rows[0]);

      if(result.rows[0] != undefined){
        console.log("existe el paciente")
        client_2.execute(query3,[gen_id_2,result.rows[0].id,receta.comentario,receta.farmacos,receta.doctor]).then(result2 => {
          console.log('Result ' + result2);
          res.json({'ID_Receta': gen_id_2})
        }).catch((err) => {console.log('ERROR:', err);});

      }else{
        console.log("No existe el paciente")
        client.execute(query2,[gen_id_1,receta.nombre,receta.apellido,receta.rut,receta.email,receta.fecha_nacimiento]).then(result => {
          console.log('Result ' + result);
          client_2.execute(query3,[gen_id_2,gen_id_1,receta.comentario,receta.farmacos,receta.doctor]).then(result2 => {
            console.log('Result ' + result2);
            res.json({'ID_Receta': gen_id_2})
          }).catch((err) => {console.log('ERROR:', err);});
        }).catch((err) => {console.log('ERROR:', err);});
      }
    }).catch((err) => {console.log('ERROR:', err);});
  })();
  
});

app.post('/edit', (req, res) => {
  (async () => {
    const query2 = 'SELECT * FROM recetas WHERE id=? ALLOW FILTERING';
    const query = "UPDATE recetas SET comentario = ?, farmacos = ?, doctor = ?  WHERE id=?;";
    const receta = req.body;
    client_2.execute(query2,[receta.id]).then(result2 => {
      console.log('Result ' + result2);
      if(result2.rows[0] != undefined)
      {
        console.log("Receta Exsite, ID: ",result2.rows[0].id)
        client_2.execute(query,[receta.comentario,receta.farmacos,receta.doctor,receta.id]).then(result2 => {
          console.log('Result ' + result2);
          res.json("Receta Actualizada");
        }).catch((err) => {console.log('ERROR:', err);});
      }else{
        res.json("La Receta no Existe");
      }
    }).catch((err) => {console.log('ERROR:', err);});

  })();
});


app.post('/delete', (req, res) => {
  (async () => {
    const query2 = 'SELECT * FROM recetas WHERE id=? ALLOW FILTERING';
    const query = "DELETE FROM recetas WHERE id=?;";
    const receta = req.body;
    client_2.execute(query2,[receta.id]).then(result2 => {
      console.log('Result ' + result2);
      if(result2.rows[0] != undefined)
      {
        console.log("Receta Exsite, ID: ",result2.rows[0].id)
        client_2.execute(query,[receta.id]).then(result2 => {
          console.log('Result ' + result2);
          res.json("Receta Eliminada");
        }).catch((err) => {console.log('ERROR:', err);});
      }else{
        res.json("La Receta no Existe");
      }
    }).catch((err) => {console.log('ERROR:', err);});

  })();
  
});


app.post('/insert_example', (req, res) => {
  (async () => {
    client_2.execute("INSERT INTO recetas (id, id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?);",
    ["40c74ccd-a5aa-4650-9459-d84e8edfdfcf","f7a13005-31db-4fea-a064-50bb832c0870","Test","Prueba","Alguien"]).then(result2 => {
      console.log('Result ' + result2);
      res.json("Ejemplo Insertado");
    }).catch((err) => {console.log('ERROR:', err);});
    

  })();
});

app.listen(PORT, HOST, () => {
  console.log(`CLIENT RUN AT http://localhost:${PORT}`);
});