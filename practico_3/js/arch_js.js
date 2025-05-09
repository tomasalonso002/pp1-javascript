const nombre = document.getElementById("nombre_participante")
const mensaje_error = document.getElementById("mensaje_error")
const boton = document.getElementById("boton_agregar")
const lista = document.getElementById("lista_participantes")

boton.addEventListener("click", ()=>{
    const text = nombre.value.trim()

    if (text === ""){
        return mensaje_error.innerText="Complete este campo"
    }else{
        mensaje_error.innerText=""
    }

    const li = document.createElement("li")
    li.innerText = text

    li.addEventListener("click", ()=>{
        li.classList.toggle("")

    })

    const btn_eliminar = document.createElement("button")
    btn_eliminar.innerText="Eliminar"
    btn_eliminar.style.marginLeft = "10px"

    btn_eliminar.addEventListener("click", (e) => {
        e.stopPropagation()
        lista.removeChild(li)
    })

    const presente = document.createElement("p")
    presente.innerText = "Presente"
    presente.style.display = "inline"
    presente.style.marginLeft= "10px"

    presente.addEventListener("click", (e) =>{
        e.stopPropagation()
        li.classList.toggle("presente")
    })

    li.appendChild(btn_eliminar)
    li.appendChild(presente)
    lista.appendChild(li)    
    
    nombre.value=""

})