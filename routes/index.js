const express = require("express");
const router = express.Router();
const fs = require("fs"); //modulo File System incorporado en express
const uuid = require("uuid4");
const multer = require("multer");

const solicitanteJSON = fs.readFileSync("src/solicitantes.json", "utf-8");
const JSONConsulta = fs.readFileSync("src/Consultaprueba.json", "utf-8");

let solicitantes = JSON.parse(solicitanteJSON);

let Consultaprueba=JSON.parse(JSONConsulta);;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./datos/CV_aspirantes");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.get("/", (req, res) => {
    //Ruta inicial del servidor
    res.render("index", { title: "BDD-NETFLIX" }); //Se manda a renderizar la vista indexPestañas html cuando se entra al ruta base del sitio web
    //console.log(__dirname, '../views/indexTabs.html');//__dirname obtiene la ruta del archivo actual
    // console.log(path.join(__dirname, '../views/indexTabs.html'));//path.join concatena los campos en la forma del SO
});

router.post("/", (req, res) => {
    //Ruta inicial del servidor
    res.render("index", { title: "BDD-NETFLIX" }); //Se manda a renderizar la vista indexPestañas html cuando se entra al ruta base del sitio web
    //console.log(__dirname, '../views/indexTabs.html');//__dirname obtiene la ruta del archivo actual
    // console.log(path.join(__dirname, '../views/indexTabs.html'));//path.join concatena los campos en la forma del SO
});

//En esta direccion pregunta si hay una solicitud pendiente en la seccion de guardados para 
//continuar con su edicion 
router.get("/Solicitante", (req, res) => {
    try {
        const datos = fs.readFileSync("./datos/Guardar/guardado.json", "utf-8");
        let Guardadosolicitante = JSON.parse(datos);
        console.log(Guardadosolicitante);

        if (Guardadosolicitante.registro === "Maestria") {
            res.render("registrarSolicitudDMG", {
                title: "SOLICITANTE",
                Guardadosolicitante,
            });
        } else if (Guardadosolicitante.registro === "Doctorado") {
            res.render("registrarSolicitudDDG", {
                title: "SOLICITANTE",
                Guardadosolicitante,
            });
        }
    } catch (err) {
        console.log("No se encontraron ningunos datos guardados");
        res.render("registrarSolicitud", { title: "SOLICITANTE" });
    }
});

//Direccion correspondiente al POST de un formulario (al darle enviar)
router.post("/Solicitante", upload.single("fileCV"), (req, res) => {
    console.log("Estas ingresando a enviar");

    var parametro = 0;
    //Todos nuestros campos de los formularios
    const {
        CURP,
        maestria,
        apellidoP,
        apellidoM,
        nombres,
        fechaNac,
        lugarNac,
        nacionalidad,
        estadoCivil,
        calle,
        noExt,
        noInt,
        colonia,
        CP,
        municipio,
        estado,
        telefono,
        email,
        institucionSuperior,
        paisInst,
        titulo,
        carrera,
        expProfesional,
        expDocente,
        checkSi,
        checkNo,
        anho,
        lineaInves,
        motivacionPosg,
        fechaSolicitud,
        firmaSolicitante,
        doctorado,
        institucionMaestria,
        graduado,
        posgrado,
        investigaciones,
        fileCV,
        status,
        comentario,
    } = req.body;

    //Verificaciones para evitar avanzar si no estan llenos todos los campos
    if (maestria === "" && doctorado === "") {
        console.log(
            "Tiene que ingresar el campo de maestria o doctorado para poder guardar / enviar"
        );
        res.redirect("/ErrorLlenado");
    }else if(CURP === "" || apellidoP === ""|| apellidoM === ""|| nombres === ""|| fechaNac === ""|| lugarNac === ""|| nacionalidad === ""|| estadoCivil === ""|| calle === "" || noExt === "" || colonia === ""|| CP === ""|| municipio === ""|| estado === ""|| telefono === ""|| email=== ""){

        console.log(
            "Llenar bien los datos"
        );
        res.redirect("/ErrorLlenado");

    }else if( maestria != "" && (institucionSuperior === "" || paisInst[0] === "" || titulo === "" || carrera === "" || expProfesional[0] === "" || expDocente[0] === "" || lineaInves[0] === "" || motivacionPosg[0] === "" || fechaSolicitud[0] === "" || firmaSolicitante[0]==="")){
            console.log(
                "Llenar bien los datos"
            );
            res.redirect("/ErrorLlenado");
    }else if (doctorado != "" && (institucionMaestria === "" || paisInst[1] === "" || graduado === "" || posgrado === "" || expProfesional[1] === "" || expDocente[1] === "" || lineaInves[1] === "" || motivacionPosg[1] === "" || investigaciones === "" || fechaSolicitud[1] === "" || firmaSolicitante[1] === "")){
            console.log(
                "Llenar bien los datos"
            );
            res.redirect("/ErrorLlenado");
        }
    else {
        var chec, anh, statush, comentarioh;

        if (checkSi == "on") {
            chec = "SI";
        } else if (checkNo == "on") {
            chec = "NO";
        }
        if (anho == "") {
            anh = "      ";
        } else {
            anh = anho;
        }
        if (status === undefined) {
            statush = "sin validar";
        }
        if (comentario === undefined) {
            comentarioh = "No hay comentarios aun";
        }

        if (maestria != "") {
            var newSolicitante = {
                CURP,
                id: uuid(),
                registro: "Maestria",
                maestria,
                apellidoP,
                apellidoM,
                nombres,
                fechaNac,
                lugarNac,
                nacionalidad,
                estadoCivil,
                calle,
                noExt,
                noInt,
                colonia,
                CP,
                municipio,
                estado,
                telefono,
                email,
                institucionSuperior,
                paisInst: paisInst[0],
                titulo,
                carrera,
                expProfesional: expProfesional[0],
                expDocente: expDocente[0],
                check: chec,
                anho: anh[0],
                lineaInves: lineaInves[0],
                motivacionPosg: motivacionPosg[0],
                fechaSolicitud: fechaSolicitud[0],
                firmaSolicitante: firmaSolicitante[0],
                fileCV,
                status: statush,
                comentario: comentarioh,
            };

            var Solicitante = {
                CURP,
                registro: "Maestria",
                fileCV,
                status: statush,
            };
            //Si ingresas una solicitud con un CURP ya existente, te lo rechaza
            solicitantes.forEach(function (solicitantes) {
                if (solicitantes.CURP === CURP) {
                    console.log(
                        "Solicitud rechaza, ya exites un CURP igual en las solicitudes"
                    );
                    res.redirect("/ErrorCURP");
                    res.end();
                    parametro = 1;
                }
            });
        } else if (doctorado != "") {
            var newSolicitante = {
                CURP,
                id: uuid(),
                registro: "Doctorado",
                doctorado,
                apellidoP,
                apellidoM,
                nombres,
                fechaNac,
                lugarNac,
                nacionalidad,
                estadoCivil,
                calle,
                noExt,
                noInt,
                colonia,
                CP,
                municipio,
                estado,
                telefono,
                email,
                institucionMaestria,
                paisInst: paisInst[1],
                graduado,
                posgrado,
                expProfesional: expProfesional[1],
                expDocente: expDocente[1],
                check: chec,
                anho: anh[1],
                lineaInves: lineaInves[1],
                motivacionPosg: motivacionPosg[1],
                investigaciones,
                fechaSolicitud: fechaSolicitud[1],
                firmaSolicitante: firmaSolicitante[1],
                fileCV,
                status: statush,
                comentario: comentarioh,
            };

            var Solicitante = {
                CURP,
                registro: "Doctorado",
                fileCV,
                status: statush,
            };

            solicitantes.forEach(function (solicitantes) {
                if (solicitantes.CURP === CURP) {
                    console.log(
                        "Solicitud rechaza, ya exites un CURP igual en las solicitudes"
                    );
                    res.redirect("/ErrorCURP");
                    res.end();
                    parametro = 1;
                }
            });
        }
        //Se aagregan los formularios de los solicitantes en sus carpetas
        if (parametro === 0) {
            const CURPJSON = JSON.stringify(newSolicitante); //Crea JSON por cada CURP
            fs.writeFileSync("./datos/JSON/" + CURP + ".json", CURPJSON, "utf-8");
            solicitantes.push(Solicitante);
            const solicitanteJSON = JSON.stringify(solicitantes);
            fs.writeFileSync("src/solicitantes.json", solicitanteJSON, "utf-8");
            res.redirect("/");
        }
    }
});

router.post("/Guardar", upload.single("fileCV"), (req, res) => {
    console.log("Estas ingresando a guardar");
    const {
        CURP,
        maestria,
        apellidoP,
        apellidoM,
        nombres,
        fechaNac,
        lugarNac,
        nacionalidad,
        estadoCivil,
        calle,
        noExt,
        noInt,
        colonia,
        CP,
        municipio,
        estado,
        telefono,
        email,
        institucionSuperior,
        paisInst,
        titulo,
        carrera,
        expProfesional,
        expDocente,
        checkSi,
        checkNo,
        anho,
        lineaInves,
        motivacionPosg,
        firmaSolicitante,
        doctorado,
        institucionMaestria,
        graduado,
        posgrado,
        investigaciones,
        fileCV,
        status,
        comentario,
    } = req.body;
    console.log(req.body);

    if (maestria === "" && doctorado === "") {
        console.log(
            "Tiene que ingresar el campo de maestria o doctorado para poder guardar / enviar"
        );
        res.redirect("/ErrorLlenado");
    } else {
        var chec, anh, statush, comentarioh;
        if (checkSi == "on") {
            chec = "SI";
        } else if (checkNo == "on") {
            chec = "NO";
        }
        if (anho == "") {
            anh = "      ";
        } else {
            anh = anho;
        }
        if (status === undefined) {
            statush = "sin validar";
        }
        if (comentario === undefined) {
            comentarioh = "No hay comentarios aun";
        }

        if (maestria != "") {
            var newSolicitante = {
                CURP,
                id: uuid(),
                registro: "Maestria",
                maestria,
                apellidoP,
                apellidoM,
                nombres,
                fechaNac,
                lugarNac,
                nacionalidad,
                estadoCivil,
                calle,
                noExt,
                noInt,
                colonia,
                CP,
                municipio,
                estado,
                telefono,
                email,
                institucionSuperior,
                paisInst: paisInst[0],
                titulo,
                carrera,
                expProfesional: expProfesional[0],
                expDocente: expDocente[0],
                check: chec,
                anho: anh[0],
                lineaInves: lineaInves[0],
                motivacionPosg: motivacionPosg[0],
                firmaSolicitante: firmaSolicitante[0],
                fileCV,
                status: statush,
                comentario: comentarioh,
            };
        } else if (doctorado != "") {
            var newSolicitante = {
                CURP,
                id: uuid(),
                registro: "Doctorado",
                doctorado,
                apellidoP,
                apellidoM,
                nombres,
                fechaNac,
                lugarNac,
                nacionalidad,
                estadoCivil,
                calle,
                noExt,
                noInt,
                colonia,
                CP,
                municipio,
                estado,
                telefono,
                email,
                institucionMaestria,
                paisInst: paisInst[1],
                graduado,
                posgrado,
                expProfesional: expProfesional[1],
                expDocente: expDocente[1],
                check: chec,
                anho: anh[1],
                lineaInves: lineaInves[1],
                motivacionPosg: motivacionPosg[1],
                investigaciones,
                firmaSolicitante: firmaSolicitante[1],
                fileCV,
                status: statush,
                comentario: comentarioh,
            };
        }
        //El progreso se guardara en la carpeta guardar para ser retomada la proxima vez
        const json_guardados = JSON.stringify(newSolicitante); //Crea JSON por cada CURP
        fs.writeFileSync("./datos/Guardar/guardado.json", json_guardados, "utf-8");
        res.redirect("/");
    }
});

router.get("/ErrorCURP", (req, res) => {
    res.render("ErrorEnvio", { title: "/Error" });
});

router.get("/ErrorLLenado", (req, res) => {
    res.render("ErrorLLenado", { title: "/Error" });
});

router.get("/Consulta", (req, res) => {
    res.render("verConsultas", { title: "/Consulta", solicitantes });
});



router.get("/editar", (req, res) => {
    // let solicitud = solicitantes.filter(solicitantes => solicitantes == req.params.CURP);
    res.render("editar", { title: "Editar Registro", solicitantes });
});

router.get("/Coordinador", (req, res) => {
    res.render("verSolicitudes", { title: "/Coordinador", solicitantes });
});

router.post("/ConsultaMongo", upload.single("fileCV"), (req, res) => {
    console.log("Estas ingresando a consulta mongo");
    let query={}
 

    console.log(req.body);
  /*if(req.body._id!==""){
    query={ ...query,"_id:": req.body._id}
    }  
   */
    if(req.body.TITLE_NAME!=="" ){
        query={ ...query,"TITLE_NAME": req.body.TITLE_NAME}
    }
    if(req.body.LANGUAGE!==""){
        query={ ...query,"LANGUAGE": req.body.LANGUAGE}
    }

    if(req.body.RELEASED!==""){
        query={ ...query,"RELEASED": req.body.RELEASED}
    }
    if(req.body.RATING!==""){
        query={ ...query,"RATING": req.body.RATING}
    }
  
   console.log(query)


  
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://abcdefgh:abcdefgh@cluster0.tciwr.mongodb.net/?retryWrites=true&w=majority";
    
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("NETFLIX");
            dbo.collection("BDD").find(query).toArray(function(err, result) {
              if (err) throw err;
            const JSONConsulta  = JSON.stringify(result);
            fs.writeFileSync("src/Consultaprueba.json", JSONConsulta, "utf-8");
            console.log(result);
              db.close();
              res.redirect("/Verconsulta");
            });
          })

          
});

router.get("/Verconsulta", (req, res) => {
    const JSONConsulta = fs.readFileSync("src/Consultaprueba.json", "utf-8");
    Consultaprueba=JSON.parse(JSONConsulta);
    res.render("verConsultasMongo", { title: "/Verconsulta", Consultaprueba });
});

router.get("/delete/:CURP", (req, res) => {
    solicitantes = solicitantes.filter(
        (solicitante) => solicitante.CURP != req.params.CURP
    );
    const solicitanteJSON = JSON.stringify(solicitantes);
    fs.writeFileSync("src/solicitantes.json", solicitanteJSON, "utf-8");
    res.redirect("/Coordinador");
});

router.post("/Subir", upload.single("fileCV"), (req, res) => {
    console.log("Se subio el archivo");
    res.redirect("/Solicitante");
});

//De la parte del coordinador, accedemos a validar un solicitud por el curp del solicitante,
//desplegamos sus datos en validacionesDMG o validacionesDDG
router.get("/Validaciones/:CURP", (req, res) => {
    //Recupera la informacion para aceptar, rechazar y condicionar la solicitud
    const CURPJSON = fs.readFileSync(
        "./datos/JSON/" + req.params.CURP + ".json",
        "utf-8"
    );
    let CURPsolicitante = JSON.parse(CURPJSON);
    if (CURPsolicitante.registro === "Maestria") {
        res.render("validacionesDMG", { title: "Validacion", CURPsolicitante });
        console.log(CURPsolicitante);
    } else if (CURPsolicitante.registro === "Doctorado") {
        res.render("validacionesDDG", { title: "Validacion", CURPsolicitante });
        console.log(CURPsolicitante);
    }
});

//Una vez agregado un status y comentario al formulario del solicitante, estos se actualizan en 
//solicitantes.json y la solicitud en la carpeta JSON con el nuevo status y comentario
router.post("/Validaciones/:CURP", upload.single("fileCV"), (req, res) => {
    const {
        CURP,
        maestria,
        apellidoP,
        apellidoM,
        nombres,
        fechaNac,
        lugarNac,
        nacionalidad,
        estadoCivil,
        calle,
        noExt,
        noInt,
        colonia,
        CP,
        municipio,
        estado,
        telefono,
        email,
        institucionSuperior,
        paisInst,
        titulo,
        carrera,
        expProfesional,
        expDocente,
        checkSi,
        checkNo,
        anho,
        lineaInves,
        motivacionPosg,
        fechaSolicitud,
        firmaSolicitante,
        doctorado,
        institucionMaestria,
        graduado,
        posgrado,
        investigaciones,
        fileCV,
        status,
        comentario,
    } = req.body;

    console.log("Voy a imprimir el CURP ", CURP);
    console.log("Estas ingresando a validaciones");
    //Abrimos el formulario del solicitante
    const CURPJSON = fs.readFileSync(
        "./datos/JSON/" + req.params.CURP + ".json",
        "utf-8"
    );
    let CURPsolicitante = JSON.parse(CURPJSON);
    //Abrimos el estado de la solicitud
    const soliciJSON = fs.readFileSync("src/solicitantes.json", "utf-8");
    let solicitan = JSON.parse(soliciJSON);

    //removemos el formulario que vamos a actualizar
    try {
        fs.unlinkSync("./datos/JSON/" + req.params.CURP + ".json");
        console.log("File removed");
    } catch (err) {
        console.error("Error al borrar el archivo", err);
    }

    try {
        fs.unlinkSync("src/solicitantes.json");
        console.log("File removed");
    } catch (err) {
        console.error("Error al borrar el archivo", err);
    }

    CURPsolicitante.status = status;
    CURPsolicitante.comentario = comentario;

    solicitan.forEach(function (solicitan) {
        if (solicitan.CURP === CURP) {
            solicitan.status = CURPsolicitante.status;
        }
    });

    //Agregamos el formulario actualizado con su nuevo status y comentario
    const CURPJSON2 = JSON.stringify(CURPsolicitante); //Crea JSON por cada CURP
    fs.writeFileSync("./datos/JSON/" + CURP + ".json", CURPJSON2, "utf-8");

    const solicitanteJSON = JSON.stringify(solicitan);
    fs.writeFileSync("src/solicitantes.json", solicitanteJSON, "utf-8");
    res.redirect("/");
});

//si existen mas rutas se agregan donde '/' tomara el valor de la ruta a la que se accedera por navegador

module.exports = router; //Se exporta la variable para tener acceso desde archivo index.js del lanzador del sitio
