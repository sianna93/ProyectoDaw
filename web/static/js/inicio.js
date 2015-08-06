function initialize() {
	document.getElementById('button_login').addEventListener('click',ValidarSesion, false);

}

function ValidarSesion (){
	var usuario, contrasena;
	
	$(document).ready(function(){
        usuario= $("#username").val();
		contrasena = $("#password").val();
		
		
		{%  for persona in personas:%}
            {%if persona.usuario == usuario && persona.password== contrasena: %}
				{{ return render_to_response('menu.html',{}) }}
			{% endif %}
		{% endfor %}
    })
}

window.addEventListener('load', initialize);