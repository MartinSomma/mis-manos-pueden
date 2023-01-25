const pathImg = '../img/'
llenarTablaCarrito()

const expresiones = {
	NombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, numeros, guion y guion_bajo
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

datos = {NombreApellido: false, Direccion: false, Correo: false}


const formulario = document.querySelector("#formDatosEnvio")
const inputs = document.querySelectorAll("#formDatosEnvio input ") 
const validarFormulario = (e) =>{
    switch (e.target.name){
        case "NombreApellido":
            validarContenido (expresiones.NombreApellido, e.target)            
            console.log(e.target.name);
            break
        case "Direccion":
            console.log(e.target.name);
            break
        break
        case "Correo":
            validarContenido (expresiones.correo, e.target)
            break
    }
}


inputs.forEach( (input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

formulario.onsubmit = (e) => {
    e.preventDefault()
    if(datos.NombreApellido == true && datos.Correo == true){
        swal("Pedido enviado. Nos pondremos en contacto por correo electronico.")
        .then((value) => {
            document.querySelector("#espacioDatosEnvio").style.display = "none"
            vaciarCarrito()
        });     
    } else {
        swal ("Corriga los datos de contacto")

    }    

}

function validarContenido (expresion, campo){
    console.log(campo.name)
    if (expresion.test(campo.value)) {
        document.getElementById(`${campo.name}`).classList.add("formInput")
        document.getElementById(`${campo.name}`).classList.remove("formInputError")
        document.querySelector(`#grupo${campo.name} .formMensajeError`).style.display ="none"
        //document.querySelector(`#grupo${campo.name} i`).classList.remove("fa-times-circle")
        //document.querySelector(`#grupo${campo.name} i`).classList.add("fa-check-circle")
        //document.querySelector(`#grupo${campo.name} i`).style.opacity = 1
        datos[campo.name] = true
        console.log (datos)
        
    } else {
        document.getElementById(`${campo.name}`).classList.remove("formInput")
        document.getElementById(`${campo.name}`).classList.add("formInputError")
        document.querySelector(`#grupo${campo.name} .formMensajeError`).style.display ="block"
        //document.querySelector(`#grupo${campo.name} i`).classList.add("fa-times-circle")
        //document.querySelector(`#grupo${campo.name} i`).classList.remove("fa-check-circle")
        //document.querySelector(`#grupo${campo.name} i`).style.opacity = 1
        datos[campo.name] = false
        
    }
}



function llenarTablaCarrito(){
    carrito = recuperarCarritoLS()
    if (carrito.length>0){
        const tablaBody = document.querySelector("tbody")
        const TablaFooter = document.querySelector(".totales")
        let total = 0
        carrito.forEach( e => {
            const item = document.createElement("tr")
            item.innerHTML = `
                        <td class="tablaId">${e.id}</td>
                        <td class="tablaImagen"><img src="${pathImg}${e.foto}" alt="${e.nombre}" class="imgTd"></td>
                        <td class="tablaNombre">${e.nombre}</td>
                        
                        <td class="btnAccion tablaBotones">
                            <buttom class="btn btnSuma " data-id=${e.id}>+</buttom>
                            <span> ${e.cantidad} </span>
                            <buttom class="btn btnResta " data-id=${e.id}>-</buttom>
                        </td>
                        <td class="tablaPrecio">$ ${e.precio*e.cantidad}</td>
                        `
            tablaBody.appendChild(item)
            total = total + (e.precio*e.cantidad)
            const btnSuma = item.querySelector(".btnSuma")
            btnSuma.onclick = (e) => SumaCantCarrito(e)

            const btnResta = item.querySelector(".btnResta")
            btnResta.onclick = (e) => RestaCantCarrito(e)

        })
        
        TablaFooter.innerHTML = `
                <div class="resumen">
                    <p id="tituloCompra" > <strong>RESUMEN DE LA COMPRA</strong></p>
                    <p id="totalCompra" ><strong>TOTAL: $ ${total}</strong></p>
                    <buttom class="btn btnVaciarCarrito">Vaciar Carrito</buttom>
                    <buttom class="btn btnFinalizar">Finalizar Compra</buttom>
                </div>    
        `
        const btnVaciar = TablaFooter.querySelector(".btnVaciarCarrito")
        const btnFinalizar = TablaFooter.querySelector(".btnFinalizar")
        btnVaciar.onclick = (e) => vaciarCarrito()
        btnFinalizar.onclick = (e) => mostrarFormDatosEnvio ()

    } else {
        const TablaFooter = document.querySelector("tfoot")
        const filaFooter = document.createElement("tr")
        filaFooter.innerHTML = `
                    <th colspan="4">Carrito Vacio</th>
        `
        TablaFooter.append(filaFooter)

    }
}

function mostrarFormDatosEnvio() {
    console.log ("se toco btn finalizar")
    document.querySelector("#espacioDatosEnvio").style.display = "block"
}


function recuperarCarritoLS(){
    return JSON.parse(localStorage.getItem('miCarrito'))
    
}

function SumaCantCarrito (evento){
    carrito = recuperarCarritoLS()
    const id = evento.target.dataset.id
    const indexItem = carrito.findIndex( e => e.id==id)
    carrito[indexItem].cantidad++
    guardarCarritoLS(carrito)
    borrarTablaCarrito()
    llenarTablaCarrito()

}

function RestaCantCarrito (evento){
    carrito = recuperarCarritoLS()
    const id = evento.target.dataset.id
    const indexItem = carrito.findIndex( e => e.id==id)
    carrito[indexItem].cantidad--
    if (carrito[indexItem].cantidad == 0) {
        eliminarIdDelCarrito(id)
        carrito = recuperarCarritoLS()
    }
    guardarCarritoLS(carrito)
    borrarTablaCarrito()
    llenarTablaCarrito()
}

function guardarCarritoLS(array){
    localStorage.setItem('miCarrito', JSON.stringify(array))
}

function borrarTablaCarrito () {
    const tablaBody = document.querySelector("tbody")
    const totalCompra = document.querySelector("#totalCompra")
    totalCompra.innerHTML = "TOTAL: $"
    while (tablaBody.firstChild){
        tablaBody.removeChild(tablaBody.firstChild)
    }
    const tablaFooter = document.querySelector("tfoot") 
    while (tablaFooter.firstChild){
        tablaFooter.removeChild(tablaFooter.firstChild)
    }
}

function eliminarIdDelCarrito(id) {
    let carrito = recuperarCarritoLS()
    const posicion = carrito.findIndex(e => e.id == id)
    carrito.splice(posicion,1)
    guardarCarritoLS(carrito)

}
function vaciarCarrito() {
    let carrito = recuperarCarritoLS()
    carrito.splice(0,carrito.length)
    guardarCarritoLS(carrito)
    borrarTablaCarrito()
    llenarTablaCarrito()
    window.location.href = "./productos.html";
}
