const seccionTarjetas = document.querySelector(".seccionTarjetas")
const pathImg = '../img/'





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





