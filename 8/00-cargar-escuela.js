// =====================================================================
//  00 — Cargar `escuela` en MongoDB
//
//  Los MISMOS datos que la base MySQL que venimos usando, modelados
//  como DOCUMENTOS.
//
//  Cómo ejecutarlo:
//     mongosh < 00-cargar-escuela.js
//  o desde mongosh ya abierto:
//     load("00-cargar-escuela.js")
//
//  Se puede correr las veces que haga falta: borra y recrea.
// =====================================================================

use("escuela");

db.estudiante.drop();
db.materia.drop();

// ---------- materia (con el docente EMBEBIDO) ----------
db.materia.insertMany([
  { _id: 1, nombre: "Programación I", codigo: "PROG1", creditos: 4,
    docente: { nombre: "Carlos", apellido: "García", especialidad: "Programación" } },
  { _id: 2, nombre: "Base de Datos", codigo: "BD1", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 3, nombre: "Matemática", codigo: "MAT1", creditos: 4,
    docente: { nombre: "Ana", apellido: "Rodríguez", especialidad: "Matemática" } },
  { _id: 4, nombre: "Inglés", codigo: "ING1", creditos: 4,
    docente: { nombre: "Carmen", apellido: "Ruiz", especialidad: "Idiomas" } },
  { _id: 5, nombre: "Programación II", codigo: "PROG2", creditos: 4,
    docente: { nombre: "Carlos", apellido: "García", especialidad: "Programación" } },
  { _id: 6, nombre: "Estructuras de Datos", codigo: "ED1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 7, nombre: "Algoritmos", codigo: "ALG1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 8, nombre: "Sistemas Operativos", codigo: "SO1", creditos: 4,
    docente: { nombre: "Pedro", apellido: "Fernández", especialidad: "Redes" } },
  { _id: 9, nombre: "Redes de Computadoras", codigo: "RED1", creditos: 4,
    docente: { nombre: "Pedro", apellido: "Fernández", especialidad: "Redes" } },
  { _id: 10, nombre: "Arquitectura de Computadoras", codigo: "ARQ1", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 11, nombre: "Ingeniería de Software", codigo: "IS1", creditos: 4,
    docente: { nombre: "Diego", apellido: "Torres", especialidad: "Ingeniería de Software" } },
  { _id: 12, nombre: "Bases de Datos Avanzadas", codigo: "BD2", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 13, nombre: "Programación Web", codigo: "PW1", creditos: 4,
    docente: { nombre: "Sofía", apellido: "Pérez", especialidad: "Desarrollo Web" } },
  { _id: 14, nombre: "Desarrollo Mobile", codigo: "DM1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 15, nombre: "Inteligencia Artificial", codigo: "IA1", creditos: 4,
    docente: { nombre: "Roberto", apellido: "González", especialidad: "Inteligencia Artificial" } },
  { _id: 16, nombre: "Seguridad Informática", codigo: "SI1", creditos: 4,
    docente: { nombre: "Laura", apellido: "Sánchez", especialidad: "Seguridad" } },
  { _id: 17, nombre: "Cálculo I", codigo: "CAL1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 18, nombre: "Cálculo II", codigo: "CAL2", creditos: 4,
    docente: { nombre: "Carlos", apellido: "García", especialidad: "Programación" } },
  { _id: 19, nombre: "Álgebra Lineal", codigo: "AL1", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 20, nombre: "Estadística", codigo: "EST1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 21, nombre: "Física I", codigo: "FIS1", creditos: 4,
    docente: { nombre: "Carlos", apellido: "García", especialidad: "Programación" } },
  { _id: 22, nombre: "Física II", codigo: "FIS2", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 23, nombre: "Inglés Técnico", codigo: "ING2", creditos: 4,
    docente: { nombre: "Carmen", apellido: "Ruiz", especialidad: "Idiomas" } },
  { _id: 24, nombre: "Comunicación", codigo: "COM1", creditos: 4,
    docente: { nombre: "Carmen", apellido: "Ruiz", especialidad: "Idiomas" } },
  { _id: 25, nombre: "Ética Profesional", codigo: "ETI1", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 26, nombre: "Proyecto Integrador I", codigo: "PI1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 27, nombre: "Proyecto Integrador II", codigo: "PI2", creditos: 4,
    docente: { nombre: "Carlos", apellido: "García", especialidad: "Programación" } },
  { _id: 28, nombre: "Prácticas Profesionales", codigo: "PP1", creditos: 4,
    docente: { nombre: "María", apellido: "López", especialidad: "Base de Datos" } },
  { _id: 29, nombre: "Seminario de Tesis", codigo: "ST1", creditos: 4,
    docente: { nombre: "Juan", apellido: "Martínez", especialidad: "Algoritmos" } },
  { _id: 30, nombre: "Emprendimiento Tecnológico", codigo: "ET1", creditos: 4,
    docente: { nombre: "Carlos", apellido: "García", especialidad: "Programación" } }
]);

// ---------- estudiante (con sus inscripciones EMBEBIDAS) ----------
db.estudiante.insertMany([
  { _id: 1, nombre: "Javier", apellido: "Lopez", email: "jlopez@gmail.com",
    fecha_nacimiento: ISODate("1992-09-10"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-10"), nota: 8.50 },
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-10"), nota: 7.00 },
      { materia: "Programación II", codigo: "PROG2", fecha: ISODate("2025-01-15"), nota: 9.00 }
    ] },
  { _id: 2, nombre: "Matias", apellido: "Riera", email: "matr@gmail.com",
    fecha_nacimiento: ISODate("1991-06-24"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-11"), nota: 9.00 },
      { materia: "Matemática", codigo: "MAT1", fecha: ISODate("2025-01-11"), nota: 8.00 },
      { materia: "Estructuras de Datos", codigo: "ED1", fecha: ISODate("2025-01-12"), nota: 7.50 },
      { materia: "Ingeniería de Software", codigo: "IS1", fecha: ISODate("2025-01-20"), nota: null }
    ] },
  { _id: 3, nombre: "Theo", apellido: "Saravia", email: "theosaravia@gmail.com",
    fecha_nacimiento: ISODate("2005-06-13"),
    inscripciones: [
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-12"), nota: null },
      { materia: "Inglés", codigo: "ING1", fecha: ISODate("2025-01-12"), nota: 6.50 }
    ] },
  { _id: 4, nombre: "Angel", apellido: "Raddino", email: "angelRaddino@gmail.com",
    fecha_nacimiento: ISODate("2005-08-15"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-13"), nota: 8.00 },
      { materia: "Algoritmos", codigo: "ALG1", fecha: ISODate("2025-01-13"), nota: 7.50 },
      { materia: "Bases de Datos Avanzadas", codigo: "BD2", fecha: ISODate("2025-01-14"), nota: 9.50 }
    ] },
  { _id: 5, nombre: "Sofia", apellido: "Martinez", email: "sofia.martinez@email.com",
    fecha_nacimiento: ISODate("2000-03-15"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-14"), nota: 9.50 },
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-14"), nota: 8.50 },
      { materia: "Programación II", codigo: "PROG2", fecha: ISODate("2025-01-15"), nota: 9.00 },
      { materia: "Programación Web", codigo: "PW1", fecha: ISODate("2025-01-16"), nota: 8.00 },
      { materia: "Desarrollo Mobile", codigo: "DM1", fecha: ISODate("2025-01-17"), nota: null }
    ] },
  { _id: 6, nombre: "Lucas", apellido: "Garcia", email: "lucas.garcia@email.com",
    fecha_nacimiento: ISODate("1999-07-22"),
    inscripciones: [
      { materia: "Matemática", codigo: "MAT1", fecha: ISODate("2025-01-15"), nota: 7.00 },
      { materia: "Cálculo I", codigo: "CAL1", fecha: ISODate("2025-01-15"), nota: 6.00 }
    ] },
  { _id: 7, nombre: "Valentina", apellido: "Rodriguez", email: "valentina.rodriguez@email.com",
    fecha_nacimiento: ISODate("2001-11-08"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-16"), nota: 8.50 },
      { materia: "Estructuras de Datos", codigo: "ED1", fecha: ISODate("2025-01-16"), nota: 7.50 },
      { materia: "Algoritmos", codigo: "ALG1", fecha: ISODate("2025-01-17"), nota: 8.00 },
      { materia: "Inteligencia Artificial", codigo: "IA1", fecha: ISODate("2025-01-18"), nota: 9.00 }
    ] },
  { _id: 8, nombre: "Mateo", apellido: "Fernandez", email: "mateo.fernandez@email.com",
    fecha_nacimiento: ISODate("2002-01-30"),
    inscripciones: [
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-17"), nota: 7.50 },
      { materia: "Sistemas Operativos", codigo: "SO1", fecha: ISODate("2025-01-17"), nota: 6.50 },
      { materia: "Redes de Computadoras", codigo: "RED1", fecha: ISODate("2025-01-18"), nota: null }
    ] },
  { _id: 9, nombre: "Isabella", apellido: "Lopez", email: "isabella.lopez@email.com",
    fecha_nacimiento: ISODate("2000-05-18"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-18"), nota: 9.00 },
      { materia: "Programación II", codigo: "PROG2", fecha: ISODate("2025-01-18"), nota: 8.50 },
      { materia: "Programación Web", codigo: "PW1", fecha: ISODate("2025-01-19"), nota: 9.50 },
      { materia: "Desarrollo Mobile", codigo: "DM1", fecha: ISODate("2025-01-20"), nota: 8.00 }
    ] },
  { _id: 10, nombre: "Santiago", apellido: "Gonzalez", email: "santiago.gonzalez@email.com",
    fecha_nacimiento: ISODate("1998-09-12"),
    inscripciones: [
      { materia: "Matemática", codigo: "MAT1", fecha: ISODate("2025-01-19"), nota: 8.00 },
      { materia: "Cálculo II", codigo: "CAL2", fecha: ISODate("2025-01-19"), nota: 7.00 }
    ] },
  { _id: 11, nombre: "Camila", apellido: "Perez", email: "camila.perez@email.com",
    fecha_nacimiento: ISODate("2001-12-25"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-20"), nota: 7.50 },
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-20"), nota: 8.00 },
      { materia: "Ingeniería de Software", codigo: "IS1", fecha: ISODate("2025-01-21"), nota: 7.00 }
    ] },
  { _id: 12, nombre: "Nicolas", apellido: "Sanchez", email: "nicolas.sanchez@email.com",
    fecha_nacimiento: ISODate("1999-04-07"),
    inscripciones: [
      { materia: "Estructuras de Datos", codigo: "ED1", fecha: ISODate("2025-01-21"), nota: 8.50 },
      { materia: "Algoritmos", codigo: "ALG1", fecha: ISODate("2025-01-21"), nota: 9.00 },
      { materia: "Arquitectura de Computadoras", codigo: "ARQ1", fecha: ISODate("2025-01-22"), nota: 7.50 },
      { materia: "Seguridad Informática", codigo: "SI1", fecha: ISODate("2025-01-22"), nota: 8.00 }
    ] },
  { _id: 13, nombre: "Martina", apellido: "Torres", email: "martina.torres@email.com",
    fecha_nacimiento: ISODate("2002-08-14"),
    inscripciones: [
      { materia: "Inglés", codigo: "ING1", fecha: ISODate("2025-01-22"), nota: 9.00 },
      { materia: "Inglés Técnico", codigo: "ING2", fecha: ISODate("2025-01-22"), nota: 8.50 }
    ] },
  { _id: 14, nombre: "Sebastian", apellido: "Ramirez", email: "sebastian.ramirez@email.com",
    fecha_nacimiento: ISODate("2000-02-28"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-23"), nota: 8.00 },
      { materia: "Programación II", codigo: "PROG2", fecha: ISODate("2025-01-23"), nota: 7.50 },
      { materia: "Programación Web", codigo: "PW1", fecha: ISODate("2025-01-24"), nota: 8.50 },
      { materia: "Inteligencia Artificial", codigo: "IA1", fecha: ISODate("2025-01-24"), nota: 9.00 },
      { materia: "Proyecto Integrador I", codigo: "PI1", fecha: ISODate("2025-01-25"), nota: null }
    ] },
  { _id: 15, nombre: "Lucia", apellido: "Flores", email: "lucia.flores@email.com",
    fecha_nacimiento: ISODate("2001-10-05"),
    inscripciones: [
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-24"), nota: 9.50 },
      { materia: "Bases de Datos Avanzadas", codigo: "BD2", fecha: ISODate("2025-01-24"), nota: 8.50 },
      { materia: "Seguridad Informática", codigo: "SI1", fecha: ISODate("2025-01-25"), nota: 7.50 }
    ] },
  { _id: 16, nombre: "Diego", apellido: "Morales", email: "diego.morales@email.com",
    fecha_nacimiento: ISODate("1999-06-20"),
    inscripciones: [] },
  { _id: 17, nombre: "Emma", apellido: "Rivera", email: "emma.rivera@email.com",
    fecha_nacimiento: ISODate("2002-03-11"),
    inscripciones: [] },
  { _id: 18, nombre: "Benjamin", apellido: "Ortiz", email: "benjamin.ortiz@email.com",
    fecha_nacimiento: ISODate("2000-07-09"),
    inscripciones: [] },
  { _id: 19, nombre: "Olivia", apellido: "Vargas", email: "olivia.vargas@email.com",
    fecha_nacimiento: ISODate("2001-09-16"),
    inscripciones: [] },
  { _id: 20, nombre: "Maximo", apellido: "Castro", email: "maximo.castro@email.com",
    fecha_nacimiento: ISODate("1998-11-23"),
    inscripciones: [] },
  { _id: 21, nombre: "Amelia", apellido: "Reyes", email: "amelia.reyes@email.com",
    fecha_nacimiento: ISODate("2002-01-04"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-28"), nota: 8.00 }
    ] },
  { _id: 22, nombre: "Tomas", apellido: "Jimenez", email: "tomas.jimenez@email.com",
    fecha_nacimiento: ISODate("1999-08-17"),
    inscripciones: [
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-28"), nota: 7.00 }
    ] },
  { _id: 23, nombre: "Mia", apellido: "Herrera", email: "mia.herrera@email.com",
    fecha_nacimiento: ISODate("2001-05-29"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-01-29"), nota: 9.50 }
    ] },
  { _id: 24, nombre: "Agustin", apellido: "Ruiz", email: "agustin.ruiz@email.com",
    fecha_nacimiento: ISODate("2000-12-13"),
    inscripciones: [
      { materia: "Inglés", codigo: "ING1", fecha: ISODate("2025-01-29"), nota: 8.00 }
    ] },
  { _id: 25, nombre: "Catalina", apellido: "Diaz", email: "catalina.diaz@email.com",
    fecha_nacimiento: ISODate("2002-04-26"),
    inscripciones: [] },
  { _id: 26, nombre: "Joaquin", apellido: "Moreno", email: "joaquin.moreno@email.com",
    fecha_nacimiento: ISODate("1999-10-02"),
    inscripciones: [
      { materia: "Base de Datos", codigo: "BD1", fecha: ISODate("2025-01-30"), nota: 8.00 }
    ] },
  { _id: 27, nombre: "Victoria", apellido: "Alvarez", email: "victoria.alvarez@email.com",
    fecha_nacimiento: ISODate("2001-07-19"),
    inscripciones: [
      { materia: "Programación I", codigo: "PROG1", fecha: ISODate("2025-02-01"), nota: 8.50 }
    ] },
  { _id: 28, nombre: "Ignacio", apellido: "Gutierrez", email: "ignacio.gutierrez@email.com",
    fecha_nacimiento: ISODate("2000-03-31"),
    inscripciones: [] },
  { _id: 29, nombre: "Antonella", apellido: "Silva", email: "antonella.silva@email.com",
    fecha_nacimiento: ISODate("2002-06-08"),
    inscripciones: [
      { materia: "Álgebra Lineal", codigo: "AL1", fecha: ISODate("2025-02-02"), nota: 9.00 }
    ] },
  { _id: 30, nombre: "Facundo", apellido: "Romero", email: "facundo.romero@email.com",
    fecha_nacimiento: ISODate("1998-09-21"),
    inscripciones: [] }
]);


// ---------------------------------------------------------------------
//  Verificación
// ---------------------------------------------------------------------

print("estudiante:", db.estudiante.countDocuments());   // 30
print("materia:   ", db.materia.countDocuments());      // 30

// Para ver un estudiante completo, con TODAS sus inscripciones adentro:
//    db.estudiante.findOne({ _id: 5 })

// =====================================================================
//  DOS COLECCIONES, no cuatro.
//
//  En MySQL hacían falta 4 tablas: docente, materia, estudiante e
//  inscripcion. Acá hay 2 colecciones:
//
//    · `docente` desapareció -> va EMBEBIDO adentro de cada materia
//    · `inscripcion` desapareció -> va EMBEBIDA adentro de cada estudiante
//
//  La tabla intermedia N:M, que era imprescindible en el modelo
//  relacional, acá no existe.
// =====================================================================
