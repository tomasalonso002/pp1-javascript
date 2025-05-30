const productos = []

const agregar_producto = () =>{
    const nombre = document.getElementById("nombre").value.trim()
    const categoria = document.getElementById("categoria").value.trim()
    const precio = parseFloat(document.getElementById("precio").value)
    if (nombre !== "" && categoria !== "" && precio !== ""){
        productos.push({nombre, categoria, precio})
        cargar_producto()

        document.getElementById("nombre").value = ""
        document.getElementById("categoria").value = ""
        document.getElementById("precio").value = ""
    }
    
    sumar_precio()

}


//LIMPIAR TABLA
const limpiar_tabla = ()=>{
    const tabla = document.getElementById("tabla_productos").querySelector("tbody")
    const total_precio = document.getElementById("precio_total")
    tabla.innerHTML= ""
    total_precio.innerText = "$"
    
}

//SUMA PRECIO TOTAL
const sumar_precio = ()=>{
    const total_precio = document.getElementById("precio_total")
    let suma_precios = 0

    for (let i = 0; i < productos.length; i++){
        suma_precios = suma_precios + productos[i].precio
    }
    total_precio.innerText = `$ ${suma_precios}`
    
}

 //CARGA DE PRODUCTOS
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
        <td><input type="Checkbox" class="checkbox_eliminar"></td>
        `
        tabla.appendChild(fila)
    })
}





