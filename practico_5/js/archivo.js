let productos = JSON.parse(localStorage.getItem("productos")) || []

let editando = false
let indice_editar=null


const agregar_producto = () =>{
    const nombre = document.getElementById("nombre").value.trim()
    const categoria = document.getElementById("categoria").value.trim()
    const precio = parseFloat(document.getElementById("precio").value)
    
    if (nombre !== "" && categoria !== "" && precio !== ""){
        if (editando){
            productos[indice_editar] = {nombre, categoria, precio}
            editando = false
            indice_editar=null
            document.querySelector('button[type = "submit"]').innerText = "Agregar Producto"

        }else{
            productos.push({nombre, categoria, precio})
        }
        
        localStorage.setItem("productos", JSON.stringify(productos))

        cargar_producto()
        mostrar_resumen()
        actualizar_select_categorias()

        document.getElementById("nombre").value = ""
        document.getElementById("categoria").value = ""
        document.getElementById("precio").value = ""

    }

    sumar_precio()

}

//Filtrar Productos por nombre de categoria
const filtar_productos = ()=>{
    const texto = document.getElementById("busqueda").value.toLowerCase()

    const productos_filtrados = productos.filter(producto => producto.categoria.toLowerCase().includes(texto))

    cargar_producto(productos_filtrados)
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
const cargar_producto = (lista = productos) => {

    const tabla = document.getElementById("tabla_productos").querySelector("tbody")

    tabla.innerText = ""

    lista.forEach((producto, index) => {
        const fila = document.createElement("tr")
        fila.innerHTML=`
        <td>${index+1}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>
            <button onclick="eliminar_producto(${index})">Eliminar</button>
            <button onclick="editar_producto(${index})">Editar</button>
        </td>
        `
        tabla.appendChild(fila)
    })
    sumar_precio()
}

//RESUMEN DE PRODUCTOS
const mostrar_resumen = () =>{
    const resumen = document.getElementById("resumen_productos")

    if(productos.length === 0){
        resumen.innerText ="No existen productos cargados"
        return;
    }

    const total =  productos.length

    //Promedio de precios

    const suma_precios = productos.reduce((acum, producto) => acum + producto.precio, 0)
    const promedio = (suma_precios/total)

    const mayor_a_100 = productos.filter(producto => producto.precio > 100).length

   resumen.innerHTML = `
   <p>Total de productos: ${total}</p>
   <p>Promedio: ${promedio}</p>
   <p>Productos masyores a $100: ${mayor_a_100}</p>
   `
}

//EDITAR PRODUCTO
const editar_producto = (index)=>{
    const producto = productos[index]
    document.getElementById("nombre").value = producto.nombre
    document.getElementById("categoria").value= producto.producto
    document.getElementById("precio").value= producto.precio

    document.querySelector('button[type = "submit"]').innerText = "Actualizar auto"

    editando = true
    indice_editar = index
}


//ELIMINAR PRODUCTO
const eliminar_producto=(index)=>{
    productos.splice(index,1)

    localStorage.setItem("productos", JSON.stringify(productos))
    cargar_producto()
    sumar_precio()
}

//Filtarar por selector
const actualizar_select_categorias=()=>{
    const select = document.getElementById("filtro_categoria")
    const categoria_unica = [...new Set(productos.map(producto => producto.categoria))]

    select.innerHTML = `<option value="Todas">Todas</option>`
    categoria_unica.forEach(categoria=>{
        const option = document.createElement("option")
        option.value = categoria
        option.text = categoria

        select.appendChild(option)
    })
}

const filtrar_por_categoria=()=>{
    const categoria = document.getElementById("filtrar_categoria").value

    if(categoria === "todas"){
        agregar_producto()
    }else{
        const categorias_filtradas = productos.filter(producto => producto.categoria === categoria)
        cargar_producto(categorias_filtradas)
    }
}



//CARGA LA PAGINA UNA VEZ QUE ENTRAS
document.addEventListener('DOMContentLoaded', () => {
    cargar_producto()
    mostrar_resumen()
    actualizar_select_categorias()
})