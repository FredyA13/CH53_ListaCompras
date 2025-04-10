//Objetivos:

// 1. Validar la informacion de los campos del producto y su cantidad //COMPLETADO
// 2. Crear un precio por producto al azar //COMPLETADO
// 3. Agregar los elementos en la tabla //COMPLETADO
// 4. Realizar las operaciones para conocer el total en costo //COMPLETADO
// 5. Realizar las operaciones para conocer el total en costo //COMPLETADO
// 6. Almacenar la informacion en el almacenamiento local del navegador //COMPLETADO
// 7. Mostrar la informacion almacenada cuando se abra la pagina //COMPLETADO

//Variable de acceso al elemento del nombre del producto
const txtName = document.getElementById("Name");
//Variable de acceso al elemento de la cantidad que queremos del producto
const txtNumber = document.getElementById("Number");
//Variable de acceso al elemento del boton agregar producto
const btnAgregar = document.getElementById("btnAgregar");
//Variable de acceso al elemento del mensaje de error del nombre del producto
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//Variable de acceso al elemento del contenedor del mensaje de error del producto
const alertValidaciones = document.getElementById("alertValidaciones");
//Variable de acceso a la tabla
const tablaListaCompras = document.getElementById("tablaListaCompras");
//Variable de acceso al tbody de la tabla, recordar que esto se regresa en forma de array, por lo tanto como solo hay una, podemos ser especificos que queremos la primera
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
//Variable de acceso al elemento del contador de productos
const contadorProductos = document.getElementById("contadorProductos");
//Variable de acceso al elemento del total de productos
const productosTotal = document.getElementById("productosTotal");
//Variable de acceso al elemento del precio total
const precioTotal = document.getElementById("precioTotal");

//Variable de acceso al elemento del boton limpiar todo
const btnClear = document.getElementById("btnClear");

//Numeracion de la primera columna de la tabla
let cont = 0;
//Variable del costo total
let costoTotal = 0;
//Variable del total de productos
let totalEnProductos = 0;
//Variable para almacenar los elementos de la tabla
let datos = new Array(); //[]

function validarCantidad(){

    //Condicion para saber si la longitud es menor o igual a 0, regresamos un falso
    if(txtNumber.value.trim().length<=0){
        return false; //Tener en cuenta que el "return" una vez se ejecuta, sale directamente de la funcion "validarCantidad"
    }//length<=0

    //Condicion para validar que sea un numero
    if(isNaN(txtNumber.value)){
        return false;
    }//isNan

    //Condicion para validar si la cantidad es mayor a 0, convirtiendolo a un numero
    if(Number(txtNumber.value)<=0){
        return false;
    }

    //Si tiene algo, regresa verdadero
    return true;

}//validarCantidad

//Funcion para crear el precio al azar
function getPrecio(){
    return Math.round(Math.random()*10000) / 100;   
}//getPrecio

//Evento de agregar producto
btnAgregar.addEventListener("click", function(event){

    event.preventDefault();

    //Esto es un Bandera, al ser true permite agregar los datos a la tabla
    let isValid = true;

    //Con las siguientes 4 líneas limpiamos ese formato de validación tanto en el nombre como en el numero.
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    //Le quitamos los espacios al nombre y valor del producto
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
        //La Bandera sera falsa si se presenta este caso, por lo tanto la validacion no es correcta y no dejara agregar datos a la tabla
        isValid = false;
    }//length<3

    if(! validarCantidad()){

        //Ponemos el borde en rojo si el valor es menor o no tiene valor //px, medium, dashed/solid, thin, thick
        txtNumber.style.border="solid medium red";
        //Agregamos el mensaje de error, mas el que ya esta puesto en dado caso que no haya puesto bien el nombre, respecto a la condicion anterior
        alertValidacionesTexto.innerHTML +="<br/><strong> La cantidad no es correcta</strong>";
        //Mostramos el contenedor del mensaje
        alertValidaciones.style.display="block";
        //La Bandera sera falsa si se presenta este caso, por lo tanto la validacion no es correcta y no dejara agregar datos a la tabla
        isValid = false;
    }//validarCantidad

    //Si pasamos las validaciones se agregan a la tabla
    if(isValid){

        //Sumamos el producto al contador
        cont++;
        //Le asignamos un precio
        let precio = getPrecio();

        // Declaramos la variable row con los datos
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                   </tr>`;
        
        //Creamos el objeto "elemento para guardar los datos de la tabla en formato JSON
        let elemento = {
                        "cont" : cont,
                        "nombre" : txtName.value,
                        "cantidad" : txtNumber.value,
                        "precio" : precio
        };
        
        //Guardamos el objeto "elemento" en el arreglo "datos"
        datos.push(elemento);

        //Guardamos los datos de la tabla en el local storage de manera de "string"
        localStorage.setItem("datos", JSON.stringify(datos));
        
        //Agregamos los datos de la variable row a la tabla
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        //CostoTotal, toFixed(2) = 2 decimales
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);

        //El total en productos individuales
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        //Usamos la misma variable "cont" para contar los productos
        contadorProductos.innerText = cont;

        //Creamos el objeto del arreglo llamado resumen para guardar los datos del resumen em formato JSON
        let resumen = {
            "cont" : cont,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
        }

        //Guardamos los datos del resumen en el local storage de manera de "string"
        localStorage.setItem("resumen", JSON.stringify(resumen));

        //Con las siguientes dos lineas limpiamos los valores de los datos
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isValid

});//btnAgregar


window.addEventListener("load", function(event){

    event.preventDefault();

    //Recuperamos el localStorage de los datos
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//datos != null

    //Mostramos en la tabla los datos guardados
    datos.forEach((d) => {
        let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                   </tr>`
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    //Recuperamos el localStorage del y se lo aplicamos al resumen
    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }//resumen !=null

    //Mostramos en las secciones los datos guardados de resumen
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;

});//window.addEventListener

//Agregar la funcionalidad de limpiar todo
//Resumen
//Tabla
//campos
//alerta
//localStorage
btnClear.addEventListener("click", function(event){

    event.preventDefault();

    //Resumen
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "$ 0.00";

    //Tabla
    cuerpoTabla.innerText="";

    //Campos de texto
    txtName.value="";
    txtNumber.value="";

    //Alertas
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    //localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
});