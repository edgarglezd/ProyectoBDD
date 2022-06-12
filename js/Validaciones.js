//En este apartado se hacen las validaciones de los campos del formulario

var archivo = document.getElementById("fileCV");
function validar() {
    var nombre, apellidoP, apellidoM, fechaNac, lugarNac, nacionalidad;
    var curp, email, telefono, expresion;
    nombre = document.getElementById("nombres").value;
    apellidoP = document.getElementById("apellidoP").value;
    apellidoM = document.getElementById("apellidoM").value;
    lugarNac = document.getElementById("lugarNac").value;
    nacionalidad = document.getElementById("nacionalidad").value;
    curp = document.getElementById("curp").value;
    email = document.getElementById("email").value;
    telefono = document.getElementById("telefono").value;
    noExt = document.getElementsByName("noExt");
    
    expresion = /\w+@\w+\.+[a-z]/ //Para validar el correo
//para validar que no haya ningún campo vacio
    if((nombre === "" || apellidoM === "" || apellidoP === ""
        || lugarNac === "" || nacionalidad === "" || curp === ""
        || email === "")){
        alert("Hay un campo obligatorio vacio");
        return false;
    } //verificar que el nombre ni apellidos sean mayores a 20 caracteres
    else if(nombre.length > 20 || apellidoM.length > 20 || apellidoP.length > 20){
        alert("Los nombres son muy largos");
        return false; 
    }
    else if(isNaN(telefono)){ //is not a number ?
        alert("El telefono ingresado no es numero");
        return false; 
    } else if(isNaN()){

    } else if(!expresion.test(email)){//que el email cumpla lo que se establecio en la expresion
        alert("El correo no es valido");
        return false; 
    } else if (!validaCV(archivo)){
        alert("No ha selecciono su CV");
        return false; 
    } else if (ValidaCV(archivo) == max){
        alert("El tamaño de su archivo CV es demasiado grande. Tamaño máximo de 1MB");
        return false;
    } else {
        alert ("Está enviando su solicitud");
        formulario.submit();
    }
        
}

// Para validar el CURP, ocupa solamente un algoritmo de validacion de curp y no hace enlace a 
// y no hace enlace a la base de datos de Renapo. Pero tiene una funcion muy acertada
function validarInput(input) {
	var curp = input.value.toUpperCase(),
    	resultado = document.getElementById("resultado"),
        valido = "No válido";
        
    if (curpValida(curp)) {
    	valido = "Válido";
        resultado.classList.add("ok");
    } else {
    	resultado.classList.remove("ok");
    }
    resultado.innerText = "CURP: " + curp + "\nFormato: " + valido;
}

function curpValida(curp) {
	var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
    	validado = curp.match(re);
	
    if (!validado)  //Coincide con el formato general?
    	return false;
    
    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma= lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if(lngDigito == 10)
            return 0;
        return lngDigito;
}
    if (validado[2] != digitoVerificador(validado[1])) 
        return false;
        
	return true; //Validado
}

// En esta parte del codigo se hace la validacion de archivo ingresado en el formulario
// y nos aseguramos de que sea un archivo con extension .pdf
function validaCV(archivo){
    extensiones_permitidas = new Array(".pdf");
    if (archivo) {
        //recupero la extensión de este nombre de archivo
       extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
       //alert (extension);
       //compruebo si la extensión está entre las permitidas
       permitida = false;
       for (var i = 0; i < extensiones_permitidas.length; i++) {
          if (extensiones_permitidas[i] == extension) {
          permitida = true;
          break;
          }
       }
       if (!permitida) {
         alert("Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join());
        }
        return true;
    }else{
       return false;
    }
 }


function deshabilitar(){
        var checkbox1 = document.getElementById("check1"); // true
        var checkbox2 = document.getElementById("check2"); // true
        var añoV =  document.getElementById(".año"); // true

        if (checkbox1.checked == true) { // si, se ejecuta
        checkbox2.checked = false; // checkbox 2 se vuelve a false
        añoV.onfocus = false;
        }else if(checkbox2.checked == true){ // es un else, no se ejecuta
        checkbox1.checked = false;
        añoV.onfocus = true;
        }     
}

/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// En esta parte del codigo se desabilitara el boton enviar si es que no esta activado el checkbox
// var checkboxM = document.getElementById('AlistarM');
// var checkboxD = document.getElementById('AlistarD');

// checkboxM.addEventListener("change", (e) =>{​​​​
//     if (checkboxM.checked || checkboxD.checked) {​​​​
//         console.log('Todo ok')
//         document.getElementById('enviar').disabled = false
//     }​​​​ else {​​​​
//         document.getElementById('enviar').disabled = true
//     }​​​​
// }​​​​);

// checkboxD.addEventListener("change", (e) =>{​​​​
//     if (checkboxM.checked || checkboxD.checked) {​​​​
//         document.getElementById('enviar').disabled = false
//     }​​​​ else {​​​​
//         document.getElementById('enviar').disabled = true
//     }​​​​
// }​​​​);

// En esta parte se puede considerar como la principal ya que refencia a el formulario donde se 
// llenan los campos para poder verificarlos de acuerdo a unas reglas de expresiones regulares
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    LugarNac: /^[a-zA-Z0-9À-ÿ\s]{1,20}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
    calle: /^[a-zA-Z0-9À-ÿ\s]{1,20}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numeros: /^\d{1,20}$/,
    CodigoP: /^\d{1,5}$/
}
const campos = {
    apellidoP: false,
    apellidoM: false,
    nombres: false,
    lugarNac: false,
    nacionalidad: false,

    calle: false,
    noExt: false,
    noInt: false,
    colonia: false,
    CP: false,
    municipio: false,
    estado: false,

    telefono: false,
    email: false,

    //Maestria

    institucionSuperior: false,
    paisInst: false,
    titulo: false,
    carrera: false,
    lineaInves: false,
    firmaSolicitante: false,

    //Doctorado

    institucionMaestria: false,
    paisInstD: false,
    graduado: false,
    posgrado: false



}
//Para validar los campos en tiempo real
const validarFormulario = (e) => {
    //console.log(e.target.name)
    switch (e.target.name){
        //Datos generales
        case "apellidoP":
            validarCampo(expresiones.nombre,e.target,'apellidoP');
        break;
        case "apellidoM":
            validarCampo(expresiones.nombre,e.target,'apellidoM');
        break;
        case "nombre123":
            validarCampo(expresiones.nombre,e.target,'nombre123');
        break;
        case "lugarNac":
            validarCampo(expresiones.LugarNac,e.target,'lugarNac');
        break;
        case "nacionalidad":
            validarCampo(expresiones.nombre,e.target,'nacionalidad');
        break;

        //Domicilio
        case "calle":
            validarCampo(expresiones.calle,e.target,'calle');
        break;
        case "noExt":
            validarCampo(expresiones.numeros,e.target,'noExt');
        break;
        case "noInt":
            validarCampo(expresiones.numeros,e.target,'noInt');
        break;
        case "colonia":
            validarCampo(expresiones.calle,e.target,'colonia');
        break;
        case "CP":
            validarCampo(expresiones.CodigoP,e.target,'CP');
        break;
        case "municipio":
            validarCampo(expresiones.calle,e.target,'municipio');
        break;
        case "estado":
            validarCampo(expresiones.nombre,e.target,'estado');
        break;

        //Contacto
        case "telefono":
            validarCampo(expresiones.telefono,e.target,'telefono');
        break;
        case "email":
            validarCampo(expresiones.correo,e.target,'email');
        break;

        //Institucion
        case "institucionSuperior":
            validarCampo(expresiones.nombre,e.target,'institucionSuperior');
        break;
        case "paisInst":
            validarCampo(expresiones.nombre,e.target,'paisInst');
        break;
        case "titulo":
            validarCampo(expresiones.nombre,e.target,'titulo');
        break;
        case "carrera":
            validarCampo(expresiones.nombre,e.target,'carrera');
        break;
        case "lineaInves":
            validarCampo(expresiones.LugarNac,e.target,'lineaInves');
        break;
        case "firmaSolicitante":
            validarCampo(expresiones.nombre,e.target,'firmaSolicitante');
        break;

        //Informacion General

        //Maestria
        case "institucionSuperior":
            validarCampo(expresiones.nombre,e.target,'institucionSuperior');
        break;
        case "paisInst":
            validarCampo(expresiones.nombre,e.target,'paisInst');
        break;
        case "titulo":
            validarCampo(expresiones.nombre,e.target,'titulo');
        break;
        case "carrera":
            validarCampo(expresiones.nombre,e.target,'carrera');
        break;
        
        //Doctorado
        case "institucionMaestria":
            validarCampo(expresiones.nombre,e.target,'institucionMaestria');
        break;
        case "paisInstD":
            validarCampo(expresiones.nombre,e.target,'paisInstD');
        break;
        case "graduado":
            validarCampo(expresiones.nombre,e.target,'graduado');
        break;
        case "posgrado":
            validarCampo(expresiones.nombre,e.target,'posgrado');
        break;

    }
}

// En esta parte se valida si el campo con la expresion regular y dependiendo el caso se 
// le agrega el estilo o no de error
const validarCampo = (expresion, input, campo) => { 
    if(expresion.test(input.value)){ 
        document.getElementById(`grupo__${campo}`).classList.remove('subForm-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('subForm-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');  
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle'); 
        //document.querySelector(`#grupo__${campo} .tex-error`).classList.remove('tex-error-activo');
        campos[campo] = true;
    }else {
        document.getElementById(`grupo__${campo}`).classList.add('subForm-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('subForm-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');  
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        //document.querySelector(`#grupo__${campo} .tex-error`).classList.add('tex-error-activo');
        campos[campo] = false;
    }
}

// Escucha cada evento de insersion de caracteres y lo manda a verificar
inputs.forEach((input) => {
    input.addEventListener('keyup',(e)=>{
        console.log(e.target.name)
    })    
    input.addEventListener('keyup',validarFormulario)

})


