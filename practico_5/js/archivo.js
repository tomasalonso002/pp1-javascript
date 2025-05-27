const productos = []

const agregar_producto = () =>{
    const nombre = document.getElementById("nombre").value.trim()
    const categoria = document.getElementById("categoria").value.trim()
    const precio = document.getElementById("precio").value
    

    if (nombre !== "" && categoria !== "" && precio !== ""){
        productos.push({nombre, categoria, precio})
        cargar_producto()

        document.getElementById("nombre").value = ""
        document.getElementById("categoria").value = ""
        document.getElementById("precio").value = ""
    }
}

//INTENTE HACER ESTA FUNCION PARA ELIMINAR UN PRODUCTO ESPECIFICO POR EL NOMBRE, PERO NO LOGRE QUE FUNCIONE
const eliminar_producto = () =>{
    const producto_a_eliminar = document.getElementById("producto_a_eliminar").value.trim()
    productos.forEach((producto, index) => {
        if(producto.nombre === producto_a_eliminar){
            productos.splice(producto_a_eliminar)
        }
    })
}


//LIMPIAR TABLA
const limpiar_tabla = ()=>{
    const tabla = document.getElementById("tabla_productos").querySelector("tbody")
    tabla.innerHTML= ""
}


const cargar_producto = () => {
    const tabla = document.getElementById("tabla_productos").querySelector("tbody")

    tabla.innerText = ""

    productos.forEach((producto, index) => {
        const fila = document.createElement("tr")
        fila.innerHTML=`
        <td>${index+1}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        `
        tabla.appendChild(fila)
    })
}


