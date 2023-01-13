const pathImg = '../img/'
llenarTablaCarrito()



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
                    <buttom class="btn btnVaciarCarrito">Finalizar Compra</buttom>
                </div>    
        `
        const btnVaciar = TablaFooter.querySelector(".btnVaciarCarrito")
        btnVaciar.onclick = (e) => vaciarCarrito()

    } else {
        const TablaFooter = document.querySelector("tfoot")
        const filaFooter = document.createElement("tr")
        filaFooter.innerHTML = `
                    <th colspan="4">Carrito Vacio</th>
        `
        TablaFooter.append(filaFooter)

    }
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
