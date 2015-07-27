
//funcion que me valida que el ingreso de la placa solo sea de un modelo en específico
function testaPlaca(plaquita) {
	padrao = /^[a-zA-Z]{3}\d{4}$/
	OK = padrao.exec(plaquita);
	if (!OK){
		window.alert ("Placa no formato incorreto!");
	}
}
                
  
 function limitar(e, contenido, caracteres)
{
    // obtenemos la tecla pulsada
    var unicode=e.keyCode? e.keyCode : e.charCode;
    // Permitimos las siguientes teclas:
    // 8 backspace
    // 46 suprimir
    // 13 enter
    // 9 tabulador
    // 37 izquierda
    // 39 derecha
    // 38 subir
    // 40 bajar
    if(unicode==8 || unicode==46 || unicode==13 || unicode==9 || unicode==37 || unicode==39 || unicode==38 || unicode==40)
      return true;
 
    if(contenido.length>=caracteres)
        return false;
 
      return true;
 }



//funcion que valida para que solo acepte letras al ingresar
//en campos de texto del formulario registras       
function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

//funcion que limpia los campos de texto
function limpia() {
    var val = document.getElementsByClassName("txtvalidar").value;
    var tam = val.length;
    for(i = 0; i < tam; i++) {
        if(!isNaN(val[i]))
            document.getElementsByClassName("txtvalidar").value = '';
            
    }
}
