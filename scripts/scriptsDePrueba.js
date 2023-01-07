const qs = document.querySelector(".btn")
//console.log(qs)

const qsa = document.querySelectorAll(".btn")
//console.log(qsa) 

const ElementByClassName = document.getElementsByClassName("btn")
//console.log (ElementByClassName)

qs.onclick = (event) => console.log(event.target)

let carrito = [
    {
        nombre: '',
        precio: 0
    }
]


let aux = JSON.parse(JSON.stringify(carrito[0]));


aux.nombre = 'heladera'
aux.precio = 150

console.log(aux)
carrito.push(aux)
console.log(carrito)

aux = JSON.parse(JSON.stringify(carrito[0]));

aux.nombre = 'tele'
aux.precio = 250

console.log(aux)
carrito.push(aux)
console.log(carrito)

localStorage.setItem('mycat', 40)
const cat = localStorage.getItem('mycat');
console.log(cat)



