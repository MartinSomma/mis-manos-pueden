const seccionTarjetas = document.querySelector(".seccionTarjetas")
const pathImg = '../img/'

const ordenar = document.querySelector(".formOrdenar")
const btnBuscar = document.getElementById("btnBuscar")


let str = ""

btnBuscar.onclick = (e) => {
    e.preventDefault()
    str = document.getElementById("inputBuscar").value
    obtenerProductosOrdenados(`?nombre=${str}`)
    
}

ordenar.onchange = (e) =>{
    paramOrdenar = document.getElementById("opcionesOrdenar").value
    str = document.getElementById("inputBuscar").value
    if (paramOrdenar == "menorPrecio"){
        obtenerProductosOrdenados (`?sortBy=precio&order=asc&nombre=${str}`)
    } else if (paramOrdenar == "mayorPrecio"){
        obtenerProductosOrdenados (`?sortBy=precio&order=desc&nombre=${str}`)
    } else if (paramOrdenar == "NombreAZ"){
        obtenerProductosOrdenados (`?sortBy=nombre&order=asc&nombre=${str}`)
    } else if (paramOrdenar == "NombreZA"){
        obtenerProductosOrdenados (`?sortBy=nombre&order=desc&nombre=${str}`)
    } else if (paramOrdenar == "Destacados"){
        console.log ('nombre: ', str )
        obtenerProductosOrdenados (`?destacado=true&nombre=${str}`)
        
    }
}

function obtenerProductosOrdenados (params){
    fetch(`https://63c17853376b9b2e647c8e81.mockapi.io/mmp/productos${params}`)
            .then((resp) => resp.json())
            .then ((data) => mostrarProductos(data))
            .catch ( (error) => {
            console.log("No se pudo conectar, error: " + error)})

}




fetch("https://63c17853376b9b2e647c8e81.mockapi.io/mmp/productos?sortBy=precio&order=desc")
    .then((resp) => resp.json())
    .then ((data) => mostrarProductos(data))
    .catch ( (error) => {
        console.log("No se pudo conectar, error: " + error)})

function mostrarProductos (productos){
    seccionTarjetas.innerHTML = ""
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








