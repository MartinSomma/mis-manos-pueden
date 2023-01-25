const expresiones = {
	NombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, numeros, guion y guion_bajo
	//Asunto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    Asunto: /^[a-zA-Z0-9À-ÿ\s]{1,40}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    mensaje: /^[a-zA-Z0-9À-ÿ()$"\s]{1,400}$/,
    //mensaje: /^[^#<>|{}[]]$/ //que no escriba caracteres especiales.
}



var datos = { NombreApellido: false, Asunto: false, Correo: false, Mensaje: false }

const inputs = document.querySelectorAll("#formulario input ")
const formulario = document.querySelector("#formulario")
const mensaje = document.querySelector("textarea")



const validarFormulario = (e) =>{
    //console.log(e.target.name);
    switch (e.target.name){
        case "NombreApellido":
            validarContenido (expresiones.NombreApellido, e.target)            
            break
        case "Asunto":
            validarContenido (expresiones.Asunto, e.target)
            break
        break
        case "Correo":
            validarContenido (expresiones.correo, e.target)
            break
        case "Mensaje": 
            validarContenido(expresiones.mensaje, e.target)
            break
    }
}



formulario.onsubmit = (event) =>{
    event.preventDefault()
    if (datos.NombreApellido & datos.Correo & datos.Asunto &datos.Mensaje){
        swal ("Mensaje enviado. Muchas Gracias.")
        inputs[0].value = ""
        inputs[1].value = ""
        inputs[2].value = ""
        mensaje.value = ""
        datos = { NombreApellido: false, Asunto: false, Correo: false, Mensaje: false }
    
    }else {
        swal ("Corregir datos ingresados.")
    }
    
} 


function validarContenido (expresion, campo){
    //console.log (campo.name)
    if (campo.name != "Mensaje" && expresion.test(campo.value)) {
        document.getElementById(`${campo.name}`).classList.add("formInput")
        document.getElementById(`${campo.name}`).classList.remove("formInputError")
        document.querySelector(`#grupo${campo.name} .formMensajeError`).style.display ="none"
        document.querySelector(`#grupo${campo.name} i`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo${campo.name} i`).classList.add("fa-check-circle")
        document.querySelector(`#grupo${campo.name} i`).style.opacity = 1
        datos[campo.name] = true
    } else if (campo.name != "Mensaje" && !expresion.test(campo.value)){
        document.getElementById(`${campo.name}`).classList.remove("formInput")
        document.getElementById(`${campo.name}`).classList.add("formInputError")
        document.querySelector(`#grupo${campo.name} .formMensajeError`).style.display ="block"
        document.querySelector(`#grupo${campo.name} i`).classList.add("fa-times-circle")
        document.querySelector(`#grupo${campo.name} i`).classList.remove("fa-check-circle")
        document.querySelector(`#grupo${campo.name} i`).style.opacity = 1
        datos[campo.name] = false
        
    } else if (campo.name == "Mensaje" && expresion.test(campo.value)){
        console.log("verdadere");
        document.getElementById(`${campo.name}`).classList.add("form-control")
        document.getElementById(`${campo.name}`).classList.remove("form-control-error")
        document.querySelector(`#grupo${campo.name} .formMensajeError`).style.display ="none"
        datos[campo.name] = true

    } else if (campo.name == "Mensaje" ){
        console.log("falso");
        document.getElementById(`${campo.name}`).classList.remove("formInput")
        document.getElementById(`${campo.name}`).classList.add("form-control-error")
        document.querySelector(`#grupo${campo.name} .formMensajeError`).style.display ="block"
        datos[campo.name] = false
    }
}

inputs.forEach( (input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

mensaje.addEventListener('keyup', validarFormulario)
mensaje.addEventListener('blur', validarFormulario)

