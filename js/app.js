// Variables
// -----------------------------------------------------------------------------

var palabras = [
	new palabra(0, "A", "Empieza por A:", " Relato breve de un acontecimiento extraño, curioso o divertido, generalmente ocurrido a la persona que lo cuenta.", "Anecdota"),
	new palabra(1, "B", "Empieza por B:", " Pasta dulce y esponjosa, hecha con harina, huevos, levadura y otros ingredientes, que puede tener distintas formas", "Bollo"),
	new palabra(2, "C", "Empieza por C:", " Corriente de agua que cae desde cierta altura a causa de un brusco desnivel en su cauce, especialmente en un rio", "Cascada"),
	new palabra(3, "D", "Empieza por D:", " Arma blanca de hoja corta, ancha y puntiaguda, parecida a la espada pero de menor tamaño", "Daga"),
	new palabra(4, "E", "Empieza por E:", " Línea curva que describe varias vueltas alrededor de un punto, alejándose cada vez más de él", "Espiral"),
	new palabra(5, "F", "Contiene la F:", " Que está descompuesto o podrido por la acción de diversos factores y determinados microorganismos", "Putrefacto"),
	new palabra(6, "G", "Empieza por G:", " Que se comporta de manera ruda, tosca o grosera", "Garrulo"),
	new palabra(7, "H", "Contiene la H:", " Persona o animal que es grueso y de poca altura", "Rechoncho"),
	new palabra(8, "I", "Empieza por I:", " Que está en el espacio existente entre dos astros, o que tiene relación con él", "Interestelar"),
	new palabra(9, "J", "Empieza por J:", " Chile picante de unos 5 cm de largo, carnoso y de punta redonda, que se usa para condimentar ciertos guisos", "Jalapeño"),
	new palabra(10, "L", "Contiene la L:", " Hombre pequeño y débil", "Homunculo"),
	new palabra(11, "M", "Empieza por M:", " Persona que sufre o muere por defender su religión o sus ideales. ", "Martir"),
	new palabra(12, "N", "Empieza por N:", " Tubo fluorescente que produce una luz brillante.", "Neon"),
	new palabra(13, "Ñ", "Contiene la Ñ:", " Dar a una cosa un color distinto del que tiene.", "Teñir"),
	new palabra(14, "O", "Empieza por O:", " Que conoce todas las cosas reales y posibles.", "Omnisciente"),
	new palabra(15, "P", "Contiene la P:", " Calzado de lona, con suela de esparto, cáñamo o goma, que se sujeta al pie por presión o con unas cintas que se atan al tobillo.", "Alpargata"),
	new palabra(16, "Q", "Empieza por Q:", " Que se puede romper fácilmente.", "Quebradizo"),
	new palabra(17, "R", "Empieza por R:", " Operación quirúrgica para restaurar la nariz.", "Rinoplastia"),
	new palabra(18, "S", "Contiene la S:", " Falta de cuidado en la forma de vestir y en el aseo personal.", "Desaliño"),
	new palabra(19, "T", "Empieza por T:", " Persona alocada, bulliciosa y molesta.", "Tabardillo"),
	new palabra(20, "U", "Contiene la U:", " Persona que rehúye el trato de otras personas y rechaza las atenciones y muestras de cariño.", "Huraño"),
	new palabra(21, "V", "Empieza por V:", " Tributo que el vasallo pagaba a su señor o servicio que le prestaba según este vínculo.", "Vasallaje"),
	new palabra(22, "X", "Contiene la X:", " Punto culminante o de mayor satisfacción de la excitación sexual en las zonas erógenas o sexuales.", "Climax"),
	new palabra(23, "Y", "Contiene la Y:", " Toro castrado, que se utiliza como animal de tiro y del cual se aprovecha su carne.", "Buey"),
	new palabra(24, "Z", "Contiene la Z:", " Que es tonto o tiene poca rapidez mental.", "Pazguato")
];

// Functions
// -----------------------------------------------------------------------------

function palabra(idNumber, letter, hint, definition, palabra, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.palabra = palabra;
	this.correct = null;
}

function VerDefinicion(pos) {
	$("#js--hint").html(palabras[pos].hint);
	$("#js--definition").html(palabras[pos].definition);
}

var cont = 25;
// Se comprueba la respuesta
function checkRespuesta(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == palabras[pos].palabra.toLowerCase()) {
		palabras[pos].correct = true;
		$(".circle .item").eq(palabras[pos].idNumber).addClass("item--success");

	} else {
		palabras[pos].correct = false;
		$(".circle .item").eq(palabras[pos].idNumber).addClass("item--failure");
	}

	

	return count++;
}

function pasapalabra(pos) {
	var w = palabras.splice(pos, 1)[0];
	palabras.push(w);

}

function continuajugando() {
	if (count != 25) {
		$("#js--user-answer").val("");
		VerDefinicion(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function contador() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 0) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(contador, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(mostrarAciertos());
	$("#js--close").addClass("hidden")
}

function mostrarAciertos() {
	var counter = 0;
	for (i = 0; i < palabras.length; i++) {
		if (palabras[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}



// ----------------------------------------------------------------------------- */

// Nuevo juego 
var count = 0; 
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	VerDefinicion(count);
	contador();
});

// enviar respusta 
$("#js--send").click(function() {
	checkRespuesta(count);
	continuajugando();
});
//control 
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkRespuesta(count);
		continuajugando();
	}
});

//pasapalabra
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuajugando();
});

$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuajugando();
	}
});


$("#js--pa").click(function() {
	location.reload()
});

// termina el juego
$("#js--close").click(function() {
	endGame();
});
