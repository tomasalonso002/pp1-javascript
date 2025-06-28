let libros = JSON.parse(localStorage.getItem("libros")) || []

let editando = false

let indice_editar = null

let orden_ascendente = true

//Agregar Libros
const agregar_libro = () => {
    const titulo_libro = document.getElementById("titulo_libro").value.trim()
    const autor_libro = document.getElementById("autor_libro").value.trim()
    const anio_publicacion_libro =  parseInt(document.getElementById("anio_publicacion_libro").value)
    const genero_libro = document.getElementById("genero_libro").value.trim()


    if (titulo_libro !== "" && autor_libro !== "" && genero_libro !== ""){
        
        if(editando){
            libros[indice_editar]= {titulo_libro, autor_libro, genero_libro, anio_publicacion_libro}
            editando = false
            indice_editar= null
            document.querySelector('button[type="submit"]').innerText="Agregar Libro"
        }else{
            const ya_existe = libros.some(libro =>
                libro.titulo_libro.toLowerCase() === titulo_libro.toLowerCase() &&
                libro.autor_libro.toLowerCase()=== autor_libro.toLowerCase()
            )
            if(ya_existe){
                alert("Ya esta cargado este libro")
                return
            }
             
            const libro = {titulo_libro,autor_libro,genero_libro,anio_publicacion_libro, leido: false}
            libros.push(libro)
        }

        document.getElementById("titulo_libro").value=""
        document.getElementById("autor_libro").value=""
        document.getElementById("genero_libro").value=""
        document.getElementById("anio_publicacion_libro").value=""
        
        localStorage.setItem("libros", JSON.stringify(libros))
        renderizar_libros()
        actualizar_selector_genero()
    }
}

//Renderizar Libros
const renderizar_libros = (lista = libros) => {

    const tabla = document.getElementById("tabla_libros").querySelector("tbody")
    tabla.innerHTML = ""


    lista.forEach(libro =>{const index_real = libros.indexOf(libro)

        const fila = document.createElement("tr")
        fila.innerHTML=`
        <td>${index_real+1}</td>
        <td>${libro.titulo_libro}</td>
        <td>${libro.autor_libro}</td>
        <td>${libro.genero_libro}</td>
        <td>${libro.anio_publicacion_libro}</td>
        <td class="actions">
            <button onclick="eliminar_libro(${index_real})">Eliminar</button>
            <button onclick="editar_libro(${index_real})">Editar</button>
        </td>
        <td class="leido">
            <input type="checkbox" ${libro.leido?'checked':''} onchange="actualizar_estado(${index_real},this.checked)">
        </td>
        `
    tabla.appendChild(fila)
    })
    resumen_estadistico()
    contar_checkboxes_activos()

}

//Editar Libros
const editar_libro = (index) => {
    const libro = libros[index]
    document.getElementById("titulo_libro").value = libro.titulo_libro
    document.getElementById("autor_libro").value = libro.autor_libro
    document.getElementById("genero_libro").value = libro.genero_libro
    document.getElementById("anio_publicacion_libro").value= libro.anio_publicacion_libro

    document.querySelector('button[type="submit"]').innerText="Actualizar Libro"

    editando = true
    indice_editar=index
}


//Filtrado dinamico por eleccion de que buscar
const filtrar_libros = () =>{
    const valor_filtro = document.getElementById("valor_filtro").value.toLowerCase()
    const libros_filtrados = libros.filter(libro => libro.autor_libro.toLowerCase().includes(valor_filtro))
    renderizar_libros(libros_filtrados)
}

//Eliminar Libros
const eliminar_libro = (index) => {
    if(editando){
        alert("ERROR: NO PODES ELIMINAR, MIENTRAS EDITAS")
    }else{
        libros.splice(index, 1)
        renderizar_libros()
        localStorage.setItem("libros", JSON.stringify(libros))
    }
}
//Ordenar por ascendente/Descendente por año
const ordenar_por_anio = () => {
    const libros_ordenados = [...libros].sort((a,b)=>{
        return orden_ascendente ? a.anio_publicacion_libro - b.anio_publicacion_libro : b.anio_publicacion_libro - a.anio_publicacion_libro
    })
    orden_ascendente = !orden_ascendente
    
    renderizar_libros(libros_ordenados)
}
const actualizar_estado = (index, nuevo_estado) =>{
    libros[index].leido = nuevo_estado
    localStorage.setItem("libros", JSON.stringify(libros))
    renderizar_libros()
}

//Contador de checkboxs activos
const contar_checkboxes_activos = () => {
    const contador_checkboxs = document.getElementById("contador_checkboxs")
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    const activos = Array.from(checkboxes).filter(cb => cb.checked).length
    contador_checkboxs.innerHTML=`
    <p>Cantidad de libros leidos: ${activos}</p>
    `
}

//Filtrado por selector de genero
 const actualizar_selector_genero=()=>{
    const select = document.getElementById("filtrar_por_genero")
    const generos_unicos = [...new Set(libros.map(libro=>libro.genero_libro))]

    select.innerHTML=`<option value="todas">Todas</option>`
    generos_unicos.forEach(genero_libro=>{
        const option = document.createElement("option")
        option.value = genero_libro
        option.text = genero_libro
        select.append(option)
    })
 }

 const filtrar_por_genero =()=>{
    const genero = document.getElementById("filtrar_por_genero").value

    if(genero === "todas"){
        renderizar_libros()
    }else{
        const libros_fitrados_genero = libros.filter(libro => libro.genero_libro===genero)
        renderizar_libros(libros_fitrados_genero)
    }
 }


//Resumen estadistico
const resumen_estadistico= () => {
    const resumen = document.getElementById("resumen_libros")
    if(libros.length === 0){
        resumen.innerText="No hay libros cargados..."
        return  
    }
    //Total de libros
    const total_de_libros = libros.length

    //promedio de año de publicacion
    let promedio_anio_publicacion = (libros.reduce((acum, libro)=> acum + parseInt(libro.anio_publicacion_libro), 0))/total_de_libros
    promedio_anio_publicacion= promedio_anio_publicacion.toFixed(0)
    
    //Cantidad de libros publ post 2010       //Libros mas antiguos y mas nuevos
    let titulo_libro_mas_antiguo = ""
    let anio_libro_mas_antiguo = null
    
    let titulo_libro_mas_nuevo = ""
    let anio_libro_mas_nuevo = null
    
    
    
    let cant_libros_post_2010 = 0
    for(let i = 0; i < total_de_libros; i++){
        if(libros[i].anio_publicacion_libro > 2010){
            cant_libros_post_2010 = cant_libros_post_2010 + 1
        }
        if(titulo_libro_mas_antiguo === ""){
            titulo_libro_mas_antiguo = libros[i].titulo_libro
            anio_libro_mas_antiguo = libros[i].anio_publicacion_libro
        }else if(anio_libro_mas_antiguo > libros[i].anio_publicacion_libro){
            titulo_libro_mas_antiguo = libros[i].titulo_libro
            anio_libro_mas_antiguo = libros[i].anio_publicacion_libro
        }
        if(titulo_libro_mas_nuevo === ""){
            titulo_libro_mas_nuevo = libros[i].titulo_libro
            anio_libro_mas_nuevo = libros[i].anio_publicacion_libro
        }else if(anio_libro_mas_nuevo < libros[i].anio_publicacion_libro){
            titulo_libro_mas_nuevo = libros[i].titulo_libro
            anio_libro_mas_nuevo = libros[i].anio_publicacion_libro
        }
    }

    resumen.innerHTML=`
    <p>El total de libros cargados: ${total_de_libros}</p>
    <p>Promedio de año de publicacion: ${promedio_anio_publicacion}</p>
    <p>El total de libros publicados posterior al 2010 son : ${cant_libros_post_2010}</p>
    <p>LIBRO MAS ANTIGUO:  ${titulo_libro_mas_antiguo}/${anio_libro_mas_antiguo}</p>
    <p>LIBRO MAS NUEVO: ${titulo_libro_mas_nuevo}/${anio_libro_mas_nuevo}</p>
    `
}

//Carga la pag cada vez que se recarga cave recalcar ja
document.addEventListener('DOMContentLoaded', () => {
    renderizar_libros()
    actualizar_selector_genero()

})