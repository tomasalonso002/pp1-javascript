let productos = JSON.parse(localStorage.getItem("productos")) || []

const agregar_producto = () =>{
    const nombre = document.getElementById("nombre").value.trim()
    const categoria = document.getElementById("categoria").value.trim()
    const precio = parseFloat(document.getElementById("precio").value)
    
    if (nombre !== "" && categoria !== "" && precio !== ""){
        productos.push({nombre, categoria, precio})

        localStorage.setItem("productos", JSON.stringify(productos))

        cargar_producto()

        document.getElementById("nombre").value = ""
        document.getElementById("categoria").value = ""
        document.getElementById("precio").value = ""

    }

    sumar_precio()

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
        <td><button onclick="eliminar_producto(${index})">Eliminar</button></td>
        `
        tabla.appendChild(fila)
    })
    sumar_precio()
}

const eliminar_producto=(index)=>{
    productos.splice(index,1)

    localStorage.setItem("productos", JSON.stringify(productos))
    cargar_producto()
    sumar_precio()
}

document.addEventListener('DOMContentLoaded', () => {
    cargar_producto()
})