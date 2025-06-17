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

        renderizar_productos()
        mostrar_resumen()
        actualizar_select_categorias()

        document.getElementById("nombre").value = ""
        document.getElementById("categoria").value = ""
        document.getElementById("precio").value = ""

    }

}

//Filtrar Productos por nombre de categoria
const filtar_productos = ()=>{
    const texto = document.getElementById("busqueda").value.toLowerCase()

    const productos_filtrados = productos.filter(producto => producto.categoria.toLowerCase().includes(texto))

    renderizar_productos(productos_filtrados)
}

//SUMA PRECIO TOTAL

 //CARGA DE PRODUCTOS
const renderizar_productos = (lista = productos) => {
    let precio_total = 0
    

    const tabla = document.getElementById("tabla_productos").querySelector("tbody")

    tabla.innerHTML = ""

    lista.forEach(producto =>{const index_real = productos.indexOf(producto)
        precio_total = producto.precio + precio_total
        const fila = document.createElement("tr")
        fila.innerHTML=`
        <td>${index_real+1}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>
            <button onclick="eliminar_producto(${index_real})">Eliminar</button>
            <button onclick="editar_producto(${index_real})">Editar</button>
        </td>
        `

        tabla.appendChild(fila)
    })
    document.getElementById("precio_total").innerText =`$ ${precio_total}`
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
    document.getElementById("categoria").value= producto.categoria
    document.getElementById("precio").value= producto.precio

    document.querySelector('button[type = "submit"]').innerText = "Actualizar producto"

    editando = true
    indice_editar = index
}

//ELIMINAR PRODUCTO
const eliminar_producto=(index)=>{
    productos.splice(index,1)

    localStorage.setItem("productos", JSON.stringify(productos))
    renderizar_productos()
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

const filtrar_por_categoria = () => {
    const categoria = document.getElementById("filtro_categoria").value

    if(categoria === "Todas"){
        renderizar_productos()
    }else{
        const categorias_filtradas = productos.filter(producto => producto.categoria === categoria)
        renderizar_productos(categorias_filtradas)
    }
}

//CARGA LA PAGINA UNA VEZ QUE ENTRAS
document.addEventListener('DOMContentLoaded', () => {
    renderizar_productos()
    mostrar_resumen()
    actualizar_select_categorias()
})