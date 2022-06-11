CREATE KEYSPACE medic_1
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 2 
};

CREATE TABLE medic_1.pacientes(
    id UUID, 
    nombre text,
    apellido text,
    rut text,
    email text,
    fecha_nacimiento text,
    PRIMARY KEY(id,rut)
);
