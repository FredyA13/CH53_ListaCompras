//Objetivos:

//1. Validar la informacion de los campos del producto y su cantidad

//Variables del nombre del producto
let txtName = document.getElementById("Name");
//Variable de la cantidad que queremos del producto
let txtNumber = document.getElementById("Number");
//Variable del boton agregar producto
let btnAgregar = document.getElementById("btnAgregar");
//Variable del mensaje de error del nombre del producto
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//Variable del contenedor del mensaje de error del producto
let alertValidaciones = document.getElementById("alertValidaciones");

//Evento de agregar producto
btnAgregar.addEventListener("click", function(event){

    event.preventDefault();

    //Le quitamos el espacio al nombre y valor del producto
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    //Validmos que la longitud del valor del nombre del producto es mayor o igual a 3
    if(txtName.value.length < 3){

        //Ponemos el borde en rojo si el valor es menor //px, medium, dashed/solid, thin, thick
        txtName.style.border="solid medium red";
        //Agregamos el mensaje de error
        alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es correcto</strong>";
        //Mostramos el contenedor del mensaje
        alertValidaciones.style.display="block";
    }//length>=3

});//btnAgregar