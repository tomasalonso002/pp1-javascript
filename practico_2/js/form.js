const form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById("usuario").value
    const errorUsuario = document.getElementById("errorUsuario")
    const edad = document.getElementById("edad").value
    const errorEdad = document.getElementById("errorEdad")
    const correo = document.getElementById("correo").value
    const errorCorreo = document.getElementById("errorCorreo")
    const password = document.getElementById("password").value
    const errorPassword = document.getElementById("errorPassword")
    const mensaje = document.getElementById("mensaje")

    if(usuario === ""){
        errorUsuario.innerText = "El nombre completo es requerido"
        errorUsuario.style.color = "red"
        errorUsuario.style.fontWeight = "bold"
        errorUsuario.style.fontSize = "25px"
        mensaje.innerText = ""
    }else if((edad === "") || (edad < 18)){
        errorUsuario.innerText = ""
        if(edad === ""){
            errorEdad.innerText = "*La edad es requerida"
        }else{
            errorEdad.innerText = "Se requiere tener 18 años o mas"
        }
        errorEdad.style.color = "red"
        errorEdad.style.fontWeight = "bold"
        errorEdad.style.fontSize = "25px"
        mensaje.innerText = ""
    }else if(correo === "") {
        errorEdad.innerText = ""
        errorCorreo.innerText = "El correo es requerido"
        errorCorreo.style.color = "red" 
        errorCorreo.style.fontWeight = "bold"
        errorCorreo.style.fontSize = "25px"
        mensaje.innerText = ""
    }else if (password === ""){
        errorCorreo.innerText = ""
        errorPassword.innerText = "La contraseña es requerida"
        errorPassword.style.color = "red" 
        errorPassword.style.fontWeight = "bold"
        errorPassword.style.fontSize = "25px"
        mensaje.innerText = ""
    }else{
        usuario.innerText=""    
        mensaje.innerText = "“🎉 ¡Registro exitoso! Bienvenido, "+ usuario}
        mensaje.style.fontSize="25px"
})
