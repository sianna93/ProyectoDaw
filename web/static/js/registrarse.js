
function initialize() {
    //document.getElementById('btnRegistrar').addEventListener('click',usuarioexiste, false);
    setNombre();
}
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


 function usuarioexiste(){
      var nickname =     document.getElementById("txtusername").value;
      var nombre =       document.getElementById("first_name").value;
      var apellido =     document.getElementById("last_name").value;
      var contraseña =   document.getElementById("txtPass").value;
      var placa=         document.getElementById("plaquita").value;
      var iscarroPosi =  document.getElementById("radioPosi").value;
      var iscarroneg =   document.getElementById("radioNega").value;
      var carro=0, existe=0;

      var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
      $.ajax({
         type: "GET",
         url:'/usuarios/',
         async: true,
         dataType:"Json",
         contenType:"application/Json; charset=utf-8",
         success: function(usuarios){
         	$.each(usuarios,function(i,usuario){
         		console.log("entro al each");
         		if(usuario.username==nickname){
         			console.log("entro al if");
	           		swal({  title: 'Error!!',text: 'El usuario ya existe',timer: 3000 });
	              	windows.alert("El usuario ya existe");
	               	existe =1;
	             }
         	});
         if(existe==0){

             if ($("input[name='is_carro']:checked").val()==1){ //si tiene carro
                 carro=1;
                 alert("si tiene carro carro = 1");
             }

             $.ajax({
                 type: "POST",
                 url:'/registrar',
                 data: {'username':nickname,
                        'first_name':nombre,
                        'last_name':apellido,
                        'password': contraseña,
                        'is_carro':carro,
                        'placa':placa, 
                        'csrfmiddlewaretoken':csrf },
                 success: function(){

                  swal({   title: 'Exito!',   text: 'El usuario ha sido registrada con exito',   timer: 2000 });
               },
                 error: function(){
                 swal({   title: 'Error!',   text: 'Error al intentar guardar usuario',   timer: 2000 });

               }
             });
             //swal({  title: 'Exito!!',   text: 'Usuario registrado',   timer: 2000 });

         }
         },
         error: function(data){
           console.log(data.responseText);
           swal({  title: 'Error!!',   text: 'No existe el usuario',   timer: 2000 });
         }
      });

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

function setNombre(){
  $( "#txtusername" ).keypress(function( event ) {
    if ( event.which == 13 ) {
       event.preventDefault();
       var txtuser=$("#txtusername" ).val();
       console.log(txtuser);
       $.ajax({
          type: "GET",
          url:'/nombres',
          data: {user_n: txtuser},
          dataType:"json",
          contentType:"application/json; charset=utf-8",
          success: function(data){
            console.log(data);
            $("#first_name").val(data.nombres);
            $("#last_name").val(data.apellidos);


          },
          error: function(data){
            swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
          }
        });
    }
  });

}


window.addEventListener( 'load', initialize,true);
