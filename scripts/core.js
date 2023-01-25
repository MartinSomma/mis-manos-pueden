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

function agregarCarrito (id){
    fetch(`https://63c17853376b9b2e647c8e81.mockapi.io/mmp/productos?id=${id}`)
    .then((resp) => resp.json())
    .then ((producto) => {
        agregarCarritoPasoDos(producto) 
    })
    .catch ( (error) => {
        console.log("No se pudo conectar, error: " + error)}
    )
}

function agregarCarritoPasoDos (prod){
    carrito = recuperarCarritoLS()
    const indexCarrito = carrito.findIndex(e => e.id == prod[0].id) 
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
    swal (`Agregaste ${prod[0].nombre}. Podes quitar o cambiar la cantidad desde el carrito`)
    

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
        basquet.textContent = `🛒${cantidad}`
     //basquet.innerHTML = `<a class="nav-link  " href="../pages/carrito.html">🛒${cantidad}</a>`
    }
    
}
// FUNCIONES DE MODO OSCURO

const navBar = document.getElementById("barraNaveg")
const btnSwitch = document.getElementById("switch")

syncModoOscuro()

btnSwitch.addEventListener("click", modoOscuro)

function leerLS(key){
    return JSON.parse(localStorage.getItem(key))
}

function grabarLS (key, valor){
     localStorage.setItem(key, JSON.stringify(valor))
}

function toogleMoLS(){
    const valor = leerLS('modoOscuro')
    valor == true ? grabarLS('modoOscuro', false) : grabarLS('modoOscuro', true)
}

function modoOscuro (evento) {
    document.body.classList.toggle("bg-dark")
    btnSwitch.classList.toggle("active")
    navBar.classList.toggle("bg-white")
    navBar.classList.toggle ("navbar-dark")
    navBar.classList.toggle("bg-dark")
    if (evento != "sync"){
        toogleMoLS()
    }
}

function syncModoOscuro () {
    const valor = leerLS('modoOscuro')
    if (valor == true) {
        modoOscuro("sync")
    } 
}

