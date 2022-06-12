var form = document.getElementById("formulario");
var inicia = document.getElementById("iniciar");
var IGMa = document.getElementById("IGMaestria");
var IGDo = document.getElementById("IGDoctorado");
var TMa = document.getElementById("texMaestria");
var TDo = document.getElementById("texDoctorado");
var TCo = document.getElementById("texConsulta");
var requisito = document.getElementById("requisito");
var txted = document.getElementById("texEditar");

function renderFormularioIGMa(){
	inicia.style.display="none";
	TDo.style.display = "none";
	requisito.style.display = "none";
	TCo.style.display = "none";
	IGDo.style.display = "none";
	form.style.display="block";
	txted.style.display = "none";

    cambiarPestaña(1);
}

function renderFormularioIGDo(){
	TMa.style.display = "none";
	inicia.style.display= "none";
	requisito.style.display = "none";
	TCo.style.display = "none";
	IGMa.style.display = "none";
	form.style.display= "block";
	txted.style.display = "none";

    cambiarPestaña(1);
}


var tabs = document.querySelectorAll('.tabs');

function cambiarPestaña(number)
{
	for(i = 0; i < tabs.length; i++)
	{
		tabs[i].classList.remove("sky");
		if (number == 1) {
			tabs[i].classList.add("close");
			tabs[0].classList.remove("close");
			tabs[0].classList.add("sky");
		}
		if (number == 2) {
			tabs[i].classList.add("close");
			tabs[1].classList.remove("close");
			tabs[1].classList.add("sky");
		}
		if (number == 3) {
			tabs[i].classList.add("close");
			tabs[2].classList.remove("close");
			tabs[2].classList.add("sky");
		}
	}
}

//Archivo JS para hacer funciones sobre las vistas de las pestañas al llenar el formulario, cambiar entre ellas