localStorage.clear()

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

productos.forEach(element => {
    const card = document.createElement("div")
    card.className = "cardProducto"
    card.innerHTML =  `
            <div class="cardImg ">
                <img src="../img/${element.foto}" alt="Foto de Velas Magnolia">
            </div>
            <p class="cardProductoNombre"><strong> ${element.nombre} </strong></p>
            <p class="cardProductoComentario">${element.descripcion}</p>
            <p class="cardProductoPrecio">Precio: $${element.precio}</p>
            <p class="btn" data-id="${element.id}">Comprar</p>
        `
seccionTarjetas.appendChild(card)
//console.log(card)
});

const botones = document.querySelectorAll(".cardProducto")
//console.log(botones)

//const boton = botones[0].querySelector(".btn")
//boton.onclick = (e) => console.log(e.target)
//console.log(boton)

for( i=0; i < botones.length; i++) {
    botones[i].querySelector(".btn").onclick = (e) => agregarCarrito(e.target.dataset.id)
}


function agregarCarrito (itemID){
    carrito = recuperarCarritoLS()
    const prod = productos.find(e => e.id == itemID)
    
    //const indexItem = carrito.indexof(carrito.id=itemID)
    console.log(carrito.length)
    if (carrito.length == 0) {
        auxCarrito.cantidad=1
        auxCarrito.id=prod.id
        auxCarrito.nombre=prod.nombre
        auxCarrito.foto=prod.foto
        auxCarrito.descripcion=prod.descripcion
        auxCarrito.precio=prod.precio
        carrito.push(auxCarrito)
        guardarCarritoLS(carrito)
    } else {
        const indexItem = carrito.findIndex( e => e.id==itemID)
        console.log("El indice dentro del carrito es: " + indexItem)
        if (indexItem<0){
            auxCarrito.cantidad=1
            auxCarrito.id=prod.id
            auxCarrito.nombre=prod.nombre
            auxCarrito.foto=prod.foto
            auxCarrito.descripcion=prod.descripcion
            auxCarrito.precio=prod.precio
            carrito.push(auxCarrito)
            guardarCarritoLS(carrito)
        } else {
            carrito[indexItem].cantidad++
            guardarCarritoLS(carrito)
        }
    }



}

function inicializarCarrito(){
    const tmp = localStorage.getItem('micarrito')
    if (tmp == null) {
        const primerElemento = []
        guardarCarritoLS(primerElemento)
    }
}

function recuperarCarritoLS(){
    const valor = localStorage.getItem('miCarrito')
    const array = []
    if (valor == null){
        return array
    } else {
        return JSON.parse(localStorage.getItem('miCarrito'))    
    }
    
    return JSON.parse(localStorage.getItem('miCarrito'))
    

}
    
function guardarCarritoLS(array){
    localStorage.setItem('miCarrito', JSON.stringify(array))
}


