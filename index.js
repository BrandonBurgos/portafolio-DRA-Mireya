/*carrusel------------------------------------------------------------------------------------------------------------------------*/

const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let currentIndex = 2; // la imagen del centro

function updateCarousel() {
  images.forEach((img, i) => {
    let offset = i - currentIndex;

    if (offset === 0) {
      img.style.transform = "translateX(0) scale(1.2)";
      img.style.zIndex = "3";
      img.style.opacity = "1";
    } else if (offset === -1 || offset === 1) {
      img.style.transform = `translateX(${offset * 220}px) scale(1)`;
      img.style.zIndex = "2";
      img.style.opacity = "0.9";
    } else if (offset === -2 || offset === 2) {
      img.style.transform = `translateX(${offset * 220}px) scale(0.8)`;
      img.style.zIndex = "1";
      img.style.opacity = "0.7";
    } else {
      img.style.opacity = "0";
      img.style.zIndex = "0";
    }
  });
}

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

// Inicializar
updateCarousel();



/*carrusel collage-------------------------------------------------------------------------------------------------------------*/


