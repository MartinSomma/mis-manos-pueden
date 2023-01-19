const seccionTarjetas = document.querySelector(".seccionTarjetas")
const pathImg = '../img/'

let auxCarrito = {
    id: 0,
    nombre: 0, 
    foto: 0,
    descripcion: 0,
    precio: 0,
    cantidad: 0
}

let carrito = recuperarCarritoLS()
actualizarBasquet(carrito)

fetch("https://63c17853376b9b2e647c8e81.mockapi.io/mmp/productos")
    .then((resp) => resp.json())
    .then ((data) => mostrarProductos(data))
    .catch ( (error) => {
        console.log("No se pudo conectar, error: " + error)})

function mostrarProductos (productos){
    productos.forEach(element => {
        const card = document.createElement("div")
        card.className = "cardProducto"
        card.innerHTML =  `
                <div class="cardImg ">
                    <img src="../img/${element.foto}" alt="${element.nombre}">
                </div>
                <p class="cardProductoNombre"><strong> ${element.nombre} </strong></p>
                <p class="cardProductoComentario">${element.descripcion}</p>
                <p class="cardProductoPrecio">Precio: $${element.precio}</p>
                <p class="btn" data-id="${element.id}">Agregar 🛒</p>
            `
        seccionTarjetas.appendChild(card)
        const botones = document.querySelectorAll(".cardProducto")
        for( i=0; i < botones.length; i++) {
            botones[i].querySelector(".btn").onclick = (e) => agregarCarrito(e.target.dataset.id)
        }
    });
    
}

function agregarCarrito (id){
    fetch(`https://63c17853376b9b2e647c8e81.mockapi.io/mmp/productos?id=${id}`)
    .then((resp) => resp.json())
    .then ((producto) => agregarCarritoPasoDos(producto, id))
    .catch ( (error) => {
        console.log("No se pudo conectar, error: " + error)}
    )
}

function agregarCarritoPasoDos (prod, itemID){
    carrito = recuperarCarritoLS()
    const indexCarrito = carrito.findIndex(e => e.id == itemID) 
    if (indexCarrito >=0) {
        carrito[indexCarrito].cantidad++
        guardarCarritoLS(carrito)
    } else{
        auxCarrito.cantidad=1
        auxCarrito.id=prod[0].id
        auxCarrito.nombre=prod[0].nombre
        auxCarrito.foto=prod[0].foto
        auxCarrito.descripcion=prod[0].descripcion
        auxCarrito.precio=prod[0].precio
        carrito.push(auxCarrito)
        guardarCarritoLS(carrito)
    }
    actualizarBasquet(carrito)
}



function recuperarCarritoLS(){
    const valor = localStorage.getItem('miCarrito')
    const array = []

    if (valor == null){
        return array
    } else {
        return JSON.parse(localStorage.getItem('miCarrito'))    
    }
}
    
function guardarCarritoLS(array){
    localStorage.setItem('miCarrito', JSON.stringify(array))
}

function actualizarBasquet (array){
    let cantidad = 0
    const basquet = document.querySelector("#iconoCarrito")

    array.forEach (e => (cantidad = cantidad + e.cantidad) )
    if (cantidad == 0) {
        basquet.textContent = `🛒VACIO`    
    } else {
     basquet.innerHTML = `<a class="nav-link  " href="../pages/carrito.html">🛒${cantidad}</a>`
    }
    
}
