
fetch("https://63c17853376b9b2e647c8e81.mockapi.io/mmp/productos")
.then((resp) => resp.json())
.then ((data) => mostrarProductos(data))
.catch ( (error) => {
    console.log("No se pudo conectar, error: " + error)})



function mostrarProductos (productos){
  const tarjetas = document.querySelector(".carrouselImgs")

  productos.forEach(element => {

    if(element.destacado == true){
      const tarjeta = document.createElement("div")
      tarjeta.className = "swiper-slide"
      tarjeta.innerHTML=`
            <img data-src="./img/${element.foto}" class="swiper-lazy" data-id="${element.id}"/>
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        `
      tarjetas.appendChild(tarjeta)
      }
    })

    const btnImagenes = document.querySelectorAll(".swiper-lazy")

    for (i=0; i<btnImagenes.length; i++){
      btnImagenes[i].onclick = (e => {
        agregarCarrito(e.target.dataset.id)
      })
    }


    let swiper = new Swiper(".mySwiper", {
      lazy: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });  


  }







  