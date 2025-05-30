peliculas = ["Como entrenar a tu dragon", "Enrredados", "Esperando la carroza"]

document.addEventListener("DOMContentLoaded", () => {
    contador_peliculas();
});

const contador_peliculas =()=>{
    const total_peliculas_almacenadas = document.getElementById("total_peliculas_almacenadas")
    cantidad = peliculas.length
    total_peliculas_almacenadas.innerHTML = cantidad
}


const mostrar_peliculas = ()=>{
    const lista_peliculas = document.getElementById("lista_peliculas")
    lista_peliculas.innerHTML = ""
    peliculas.forEach(pelicula =>{
        const li = document.createElement("li")        
        li.innerText = pelicula
        lista_peliculas.appendChild(li)
    })
}

const agregar_pelicula = () =>{
    const pelicula_nueva = document.getElementById("pelicula_nueva").value.trim()
    const mje_error_pelicula_nueva = document.getElementById("mje_error_pelicula_nueva")
    if (pelicula_nueva === ""){
        mje_error_pelicula_nueva.innerText = "Agregar una pelicula"
        mje_error_pelicula_nueva.style.color="red"
    }else if(peliculas.includes(pelicula_nueva)){
        mje_error_pelicula_nueva.innerText = "La pelicula ya esta en la lista"
        mje_error_pelicula_nueva.style.color="red"
    }else{
        peliculas.push(pelicula_nueva)
        mostrar_peliculas()
        mje_error_pelicula_nueva.innerText = ""
        document.getElementById("pelicula_nueva").value = ""
    }
    contador_peliculas()
}

const eliminar = () =>{
    const posicion_pelicula = document.getElementById("posicion_pelicula").value
    const cantidad_pelicula = document.getElementById("cantidad_pelicula").value
    peliculas.splice(posicion_pelicula, cantidad_pelicula)
    mostrar_peliculas()
    contador_peliculas()
}

const modificar_lista_peliculas = () =>{
    if(peliculas.length === 0){
        alert("No hay peliculas")
    } else{
        const lista = peliculas.map((pelicula, i) => `${i}. ${pelicula}`).join("\n")
        alert(`Lista de peliculas:\n${lista}`)          
    }
}


