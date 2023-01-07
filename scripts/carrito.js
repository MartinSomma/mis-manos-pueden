
llenarTablaCarrito()



function llenarTablaCarrito(){
    carrito = recuperarCarritoLS()
    if (carrito.length>0){
        const tablaBody = document.querySelector("tbody")
        const TablaFooter = document.querySelector("tfoot")
        let total = 0
        carrito.forEach( e => {
            const item = document.createElement("tr")
            item.innerHTML = `
                        <td>${e.id}</td>
                        <td>${e.nombre}</td>
                        <td>${e.cantidad}</td>
                        <td class="btnAccion">
                            <buttom class="btn btnSuma" data-id=${e.id}>+</buttom>
                            <buttom class="btn btnResta" data-id=${e.id}>-</buttom>
                        </td>
                        <td>${e.precio*e.cantidad}</td>
                        `
            tablaBody.appendChild(item)
            total = total + (e.precio*e.cantidad)
            const btnSuma = item.querySelector(".btnSuma")
            btnSuma.onclick = (e) => SumaCantCarrito(e)

            const btnResta = item.querySelector(".btnResta")
            btnResta.onclick = (e) => RestaCantCarrito(e)

        })
        const filaFooter = document.createElement("tr")
        filaFooter.innerHTML = `
                    <th colspan="3">TOTAL</th>
                    <td> <buttom class="btn btnVaciarCarrito">Vaciar Carrito</buttom></td>
                    <td>${total}</td>
        `
        TablaFooter.append(filaFooter)
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

//const boton = botones[0].querySelector(".btn")
//boton.onclick = (e) => console.log(e.target)
//console.log(boton)

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
    while (tablaBody.firstChild){
        tablaBody.removeChild(tablaBody.firstChild)
    }
    const tablaFooter = document.querySelector("tfoot") 
    while (tablaFooter.firstChild){
        tablaFooter.removeChild(tablaFooter.firstChild)
    }
}

function eliminarIdDelCarrito(id) {
    console.log ("pasa" + id)
    let carrito = recuperarCarritoLS()
    const posicion = carrito.findIndex(e => e.id == id)
    carrito.splice(posicion,1)
    guardarCarritoLS(carrito)
    console.log (carrito)

}
function vaciarCarrito() {
    let carrito = recuperarCarritoLS()
    carrito.splice(0,carrito.length)
    guardarCarritoLS(carrito)
    //localStorage.removeItem('miCarrito')
    //localStorage.setItem('miCarrito', [])
    borrarTablaCarrito()
    llenarTablaCarrito()
}
