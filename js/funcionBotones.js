function guardar(){
    var name;
    CURP = document.getElementById("curp");
    doctoradoForm = document.getElementsByName("doctoradoName");
    if(curp === ""){
        alert("Campo CURP vacio, favor de llenar para guardar");
    } 
    if(name === "doctoradoName"){
        action = "/Doctorado";
    } else if (name === "maestriaName"){
        action = "/Maestria";
    }
}

function subirArchivos(){
    const multer = require('multer');
    const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './datos/CV_aspirantes') // Agregamos el directorio donde se guardarán los archivos.
            },
             filename: function (req, file, cb) {
                cb(null, file.originalname) // Le pasamos el nombre original del archivo, también podriamos cambiar el nombre concatenando la fecha actual.
            }
        });
        const upload = multer({storage}); // Cambiamos el atributo dest por el storage.
        upload.single('fileCV');
}

//Para validar el CURP
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
//función que nos validará la CURP
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
//La CURP se valida con ayuda del algoritmo que ocupan para generar el digito verificador, 
//de esta manera, nos aseguramos que la CURP ingresada sea correcta
