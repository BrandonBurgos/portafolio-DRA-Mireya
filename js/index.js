/* =========================================================
   1. DATOS PREDETERMINADOS DE LA PÁGINA PRINCIPAL
   ========================================================= */

const defaultData = {
  title: "DRA. MIREYA BURGOS",

  subtitle: "Profesora Investigadora",

  description:
    "Investigadora Nacional Nivel I, especializada en sistemática, evolución y genética de poblaciones de plantas. Mi trabajo se enfoca en la conservación y aprovechamiento de la biodiversidad vegetal de México, integrando investigación, docencia y formación de nuevos especialistas.",

  buttonText: "Leer más",

  buttonUrl: "html/alumnos.html",

  keywordsTitle: "Palabras Clave",

  keywords: [
    "Dataciones moleculares",
    "Taxonomía",
    "Evolución",
    "Curso de botánica sistemática"
  ],

  /* Imágenes que pueden venir desde el administrador */
  carouselImages: [],
  collageImages: []
};


/* =========================================================
   2. NORMALIZAR LOS DATOS RECIBIDOS
   =========================================================
   Esta función permite utilizar diferentes estructuras
   de siteData sin romper la página.
   ========================================================= */

function normalizeIndexData(parsed) {

  /* Si no hay datos válidos, usamos los predeterminados */
  if (!parsed || typeof parsed !== "object") {
    return { ...defaultData };
  }


  /* ---------------------------------------------------------
     Si siteData tiene la estructura:

     {
       index: {
         title: "...",
         ...
       }
     }

     usamos parsed.index
     --------------------------------------------------------- */

  if (parsed.index && typeof parsed.index === "object") {

    return {
      ...defaultData,
      ...parsed.index,

      buttonText:
        parsed.index.buttonText ||
        defaultData.buttonText,

      buttonUrl:
        parsed.index.buttonUrl ||
        defaultData.buttonUrl,

      keywords:
        Array.isArray(parsed.index.keywords)
          ? parsed.index.keywords
          : defaultData.keywords,

      carouselImages:
        Array.isArray(parsed.index.carouselImages)
          ? parsed.index.carouselImages
          : defaultData.carouselImages,

      collageImages:
        Array.isArray(parsed.index.collageImages)
          ? parsed.index.collageImages
          : defaultData.collageImages
    };
  }


  /* ---------------------------------------------------------
     Compatibilidad con una estructura anterior de siteData
     --------------------------------------------------------- */

  return {
    ...defaultData,

    title:
      parsed.title ||
      defaultData.title,

    subtitle:
      parsed.subtitle ||
      defaultData.subtitle,

    description:
      parsed.description ||
      defaultData.description,

    buttonText:
      parsed.buttonText ||
      parsed.button ||
      defaultData.buttonText,

    buttonUrl:
      parsed.buttonUrl ||
      parsed.buttonLink ||
      defaultData.buttonUrl,

    keywordsTitle:
      parsed.keywordsTitle ||
      defaultData.keywordsTitle,

    keywords:
      Array.isArray(parsed.keywords)
        ? parsed.keywords
        : defaultData.keywords,

    carouselImages:
      Array.isArray(parsed.carousel)
        ? parsed.carousel
        : Array.isArray(parsed.carouselImages)
        ? parsed.carouselImages
        : defaultData.carouselImages,

    collageImages:
      Array.isArray(parsed.collage)
        ? parsed.collage
        : Array.isArray(parsed.collageImages)
        ? parsed.collageImages
        : defaultData.collageImages
  };
}


/* =========================================================
   3. OBTENER LOS DATOS GUARDADOS EN LOCALSTORAGE
   ========================================================= */

function getSiteData() {

  try {

    const raw = localStorage.getItem("siteData");


    /* Si no existe siteData usamos los datos originales */
    if (!raw) {
      return { ...defaultData };
    }


    /* Convertimos el texto JSON en un objeto JavaScript */
    const parsed = JSON.parse(raw);


    /* Normalizamos los datos */
    return normalizeIndexData(parsed);

  } catch (error) {

    console.error(
      "Error leyendo siteData:",
      error
    );


    /* Si ocurre un error la página seguirá funcionando */
    return { ...defaultData };
  }
}


/* =========================================================
   4. COLOCAR LOS TEXTOS EN EL HTML
   ========================================================= */

function applyTextContent(data) {

  /* Buscamos los elementos del index.html */

  const titleEl =
    document.getElementById("title");

  const subtitleEl =
    document.getElementById("subtitle");

  const descriptionEl =
    document.getElementById("description");

  const buttonEl =
    document.getElementById("readMore");

  const keywordsTitleEl =
    document.getElementById("keywordsTitle");

  const keywordsListEl =
    document.getElementById("keywordsList");


  /* ---------------------------------------------------------
     TÍTULO
     --------------------------------------------------------- */

  if (titleEl) {
    titleEl.textContent =
      data.title || "";
  }


  /* ---------------------------------------------------------
     SUBTÍTULO
     --------------------------------------------------------- */

  if (subtitleEl) {
    subtitleEl.textContent =
      data.subtitle || "";
  }


  /* ---------------------------------------------------------
     DESCRIPCIÓN
     --------------------------------------------------------- */

  if (descriptionEl) {
    descriptionEl.textContent =
      data.description || "";
  }


  /* ---------------------------------------------------------
     TÍTULO DE PALABRAS CLAVE
     --------------------------------------------------------- */

  if (keywordsTitleEl) {
    keywordsTitleEl.textContent =
      data.keywordsTitle || "";
  }


  /* =========================================================
     5. BOTÓN "LEER MÁS"
     ========================================================= */

  if (buttonEl) {

    buttonEl.textContent =
      data.buttonText || "Leer más";


    /* Si en algún momento se cambia a una etiqueta <a> */
    if (
      buttonEl.tagName.toLowerCase() === "a"
    ) {

      buttonEl.setAttribute(
        "href",
        data.buttonUrl ||
        "html/alumnos.html"
      );

    } else {

      /* Actualmente en index.html es un <button> */

      buttonEl.onclick = () => {

        window.location.href =
          data.buttonUrl ||
          "html/alumnos.html";
      };
    }
  }


  /* =========================================================
     6. LISTA DE PALABRAS CLAVE
     ========================================================= */

  if (keywordsListEl) {

    /* Eliminamos las palabras anteriores */
    keywordsListEl.innerHTML = "";


    /* Creamos cada palabra clave */
    (data.keywords || []).forEach(
      (keyword) => {

        const li =
          document.createElement("li");

        li.textContent =
          keyword;

        keywordsListEl.appendChild(li);
      }
    );
  }
}


/* =========================================================
   7. COLOCAR IMÁGENES
   =========================================================
   Sirve tanto para el carrusel como para el collage.
   ========================================================= */

function applyImages(selector, imagesArray) {

  const imgElements =
    document.querySelectorAll(selector);


  imgElements.forEach((img, index) => {

    const src =
      imagesArray?.[index];


    /* =====================================================
       EXISTE UNA IMAGEN
       ===================================================== */

    if (
      src &&
      typeof src === "string" &&
      src.trim() !== ""
    ) {

      img.src =
        src.trim();


      /* Mostrar normalmente */

      img.style.visibility =
        "visible";

      img.style.display =
        "block";


      /* Quitar estado vacío */

      img.classList.remove(
        "image-empty"
      );


      /* Si carga correctamente */

      img.onload = () => {

        img.style.visibility =
          "visible";

        img.classList.remove(
          "image-empty"
        );
      };


      /* Si la imagen tiene algún problema */

      img.onerror = () => {

        console.error(
          `No se pudo cargar la imagen ${index + 1}:`,
          src
        );


        /*
          NO ocultamos la tarjeta.
          Solamente mostramos el espacio vacío.
        */

        img.removeAttribute("src");

        img.classList.add(
          "image-empty"
        );
      };

    }

    /* =====================================================
       TODAVÍA NO EXISTE IMAGEN
       ===================================================== */

    else {

      img.removeAttribute(
        "src"
      );


      /*
        Muy importante:
        NO usamos visibility:hidden
        NO usamos display:none
      */

      img.style.visibility =
        "visible";

      img.style.display =
        "block";


      img.classList.add(
        "image-empty"
      );
    }
  });
}


/* =========================================================
   8. CONFIGURACIÓN RESPONSIVE DEL CARRUSEL
   =========================================================
   Aquí decidimos qué separación utilizar dependiendo
   del tamaño de pantalla.
   ========================================================= */

function getCarouselConfig() {

  const width =
    window.innerWidth;


  /* ---------------------------------------------------------
     CELULAR PEQUEÑO
     --------------------------------------------------------- */

  if (width <= 480) {

    return {
      distance: 105,
      centerScale: 1.08,
      sideScale: 0.82,
      farScale: 0.65,
      showFarImages: false
    };
  }


  /* ---------------------------------------------------------
     TABLET / CELULAR GRANDE
     --------------------------------------------------------- */

  if (width <= 768) {

    return {
      distance: 145,
      centerScale: 1.1,
      sideScale: 0.88,
      farScale: 0.7,
      showFarImages: false
    };
  }


  /* ---------------------------------------------------------
     LAPTOP / TABLET HORIZONTAL
     --------------------------------------------------------- */

  if (width <= 1024) {

    return {
      distance: 180,
      centerScale: 1.12,
      sideScale: 0.92,
      farScale: 0.75,
      showFarImages: true
    };
  }


  /* ---------------------------------------------------------
     COMPUTADORA
     --------------------------------------------------------- */

  return {
    distance: 220,
    centerScale: 1.15,
    sideScale: 1,
    farScale: 0.8,
    showFarImages: true
  };
}


/* =========================================================
   9. CALCULAR POSICIÓN CIRCULAR DEL CARRUSEL
   =========================================================
   Esto hace que cuando lleguemos a la última imagen,
   la siguiente vuelva correctamente al principio.
   ========================================================= */

function getCircularOffset(
  index,
  currentIndex,
  total
) {

  let offset =
    index - currentIndex;


  /* Corregir hacia la izquierda */
  if (offset > total / 2) {

    offset -= total;
  }


  /* Corregir hacia la derecha */
  if (offset < -total / 2) {

    offset += total;
  }


  return offset;
}


/* =========================================================
   10. INICIAR CARRUSEL
   ========================================================= */

function initCarousel() {

  const images =
    document.querySelectorAll(
      ".carousel img"
    );

  const prev =
    document.querySelector(".prev");

  const next =
    document.querySelector(".next");


  /* ---------------------------------------------------------
     Si falta algún elemento, no iniciamos el carrusel
     --------------------------------------------------------- */

  if (
    !images.length ||
    !prev ||
    !next
  ) {

    return;
  }


  /* ---------------------------------------------------------
     Empezamos mostrando aproximadamente la tercera imagen,
     igual que en tu código original.
     --------------------------------------------------------- */

  let currentIndex =
    Math.min(
      2,
      images.length - 1
    );


  /* =========================================================
     11. ACTUALIZAR POSICIÓN DE LAS IMÁGENES
     ========================================================= */

  function updateCarousel() {

    const config =
      getCarouselConfig();


    images.forEach(
      (img, i) => {

        const offset =
          getCircularOffset(
            i,
            currentIndex,
            images.length
          );


        /* =====================================================
           IMAGEN CENTRAL
           ===================================================== */

        if (offset === 0) {

          img.style.transform = `
            translate(-50%, -50%)
            translateX(0)
            scale(${config.centerScale})
          `;

          img.style.zIndex = "4";

          img.style.opacity = "1";
        }


        /* =====================================================
           IMAGEN INMEDIATAMENTE A LA IZQUIERDA O DERECHA
           ===================================================== */

        else if (
          offset === -1 ||
          offset === 1
        ) {

          img.style.transform = `
            translate(-50%, -50%)
            translateX(${offset * config.distance}px)
            scale(${config.sideScale})
          `;

          img.style.zIndex = "3";

          img.style.opacity = "0.9";
        }


        /* =====================================================
           SEGUNDA IMAGEN DE CADA LADO
           ===================================================== */

        else if (
          offset === -2 ||
          offset === 2
        ) {

          /* En celular pequeño no mostramos esta capa */
          if (!config.showFarImages) {

            img.style.opacity = "0";

            img.style.zIndex = "0";

            return;
          }


          img.style.transform = `
            translate(-50%, -50%)
            translateX(${offset * config.distance}px)
            scale(${config.farScale})
          `;

          img.style.zIndex = "2";

          img.style.opacity = "0.6";
        }


        /* =====================================================
           RESTO DE IMÁGENES
           ===================================================== */

        else {

          img.style.opacity = "0";

          img.style.zIndex = "0";
        }
      }
    );
  }


  /* =========================================================
     12. BOTÓN ANTERIOR
     ========================================================= */

  prev.addEventListener(
    "click",
    () => {

      currentIndex =
        (
          currentIndex -
          1 +
          images.length
        ) %
        images.length;

      updateCarousel();
    }
  );


  /* =========================================================
     13. BOTÓN SIGUIENTE
     ========================================================= */

  next.addEventListener(
    "click",
    () => {

      currentIndex =
        (
          currentIndex + 1
        ) %
        images.length;

      updateCarousel();
    }
  );


  /* =========================================================
     14. SOPORTE TÁCTIL PARA CELULARES
     =========================================================
     Permite deslizar el carrusel con el dedo.
     ========================================================= */

  const carousel =
    document.querySelector(".carousel");

  let touchStartX = 0;

  let touchEndX = 0;


  if (carousel) {

    carousel.addEventListener(
      "touchstart",
      (event) => {

        touchStartX =
          event.changedTouches[0]
            .screenX;
      },
      {
        passive: true
      }
    );


    carousel.addEventListener(
      "touchend",
      (event) => {

        touchEndX =
          event.changedTouches[0]
            .screenX;


        const difference =
          touchStartX -
          touchEndX;


        /* Evita reaccionar a movimientos muy pequeños */
        if (
          Math.abs(difference) <
          50
        ) {

          return;
        }


        /* Deslizar hacia la izquierda */
        if (difference > 0) {

          currentIndex =
            (
              currentIndex + 1
            ) %
            images.length;
        }


        /* Deslizar hacia la derecha */
        else {

          currentIndex =
            (
              currentIndex -
              1 +
              images.length
            ) %
            images.length;
        }


        updateCarousel();
      },
      {
        passive: true
      }
    );
  }


  /* =========================================================
     15. ACTUALIZAR AL CAMBIAR EL TAMAÑO DE LA PANTALLA
     =========================================================
     Esto permite pasar de computadora a tablet/celular
     sin tener que recargar la página.
     ========================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          () => {

            updateCarousel();

          },
          100
        );
    }
  );


  /* Primera carga del carrusel */
  updateCarousel();
}


/* =========================================================
   16. INICIAR LA PÁGINA
   =========================================================
   DOMContentLoaded espera a que el HTML esté completamente
   cargado antes de ejecutar el código.
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* Obtener información guardada */
    const data =
      getSiteData();


    /* Colocar textos */
    applyTextContent(data);


    /* Colocar imágenes del carrusel */
    applyImages(
      ".carousel img",
      data.carouselImages
    );


    /* Colocar imágenes del collage */
    applyImages(
      ".collage img",
      data.collageImages
    );


    /* Iniciar carrusel */
    initCarousel();
  }
);