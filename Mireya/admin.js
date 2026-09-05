/* =========================================================
   1. CONFIGURACIÓN DEL ADMINISTRADOR
   ========================================================= */

/*
  IMPORTANTE:
  Este usuario y contraseña están dentro de JavaScript,
  por lo tanto NO constituyen seguridad real de servidor.

  Por ahora lo conservamos porque tu proyecto funciona
  principalmente del lado del navegador.
*/

const ADMIN_USER = "mireya-admin";
const ADMIN_PASS = "Botanica2025!";


/* =========================================================
   2. CONFIGURACIÓN DE IMÁGENES
   ========================================================= */

/*
  Permitimos seleccionar archivos relativamente grandes,
  pero antes de guardarlos los comprimimos.

  Esto es MUY importante porque localStorage tiene
  almacenamiento limitado.
*/

const MAX_UPLOAD_SIZE_MB = 8;
const MAX_UPLOAD_SIZE_BYTES =
  MAX_UPLOAD_SIZE_MB * 1024 * 1024;


/*
  Tamaño máximo aproximado al comprimir.

  160 KB por imagen permite almacenar muchas más imágenes
  sin llenar localStorage tan rápidamente.
*/

const TARGET_IMAGE_SIZE_KB = 160;
const TARGET_IMAGE_SIZE_BYTES =
  TARGET_IMAGE_SIZE_KB * 1024;


/*
  Resolución máxima de las imágenes después de comprimir.
*/

const MAX_IMAGE_WIDTH = 1200;
const MAX_IMAGE_HEIGHT = 1200;


/* =========================================================
   3. DATOS PREDETERMINADOS DEL SITIO
   ========================================================= */

const defaultSiteData = {

  /* ---------------------------------------------------------
     PÁGINA PRINCIPAL
     --------------------------------------------------------- */

  index: {

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

    /* 6 imágenes del carrusel */
    carouselImages:
      Array(6).fill(""),

    /* 18 imágenes del collage */
    collageImages:
      Array(18).fill("")
  },


  /* ---------------------------------------------------------
     CURSOS
     --------------------------------------------------------- */

  cursos: {

    title:
      "Cursos como Profesora titular e invitada",

    itemsLeft: [
      "Botánica Sistemática Avanzada",
      "Introducción a la Botánica de Campo",
      "Genética de la Conservación",
      "Biogeografía (Biogeografía Evolutiva)"
    ],

    itemsRight: [
      "Fundamentos de Biología de la Conservación",
      "Ecología Molecular y Manejo para la Conservación"
    ],

    sliderImages: [
      "../imagenesIndex/curso1.jpg",
      "../imagenesIndex/curso2.jpg",
      "../imagenesIndex/curso3.jpg"
    ]
  },


  /* ---------------------------------------------------------
     LGAC
     --------------------------------------------------------- */

  lgac: {

    title:
      "Línea de Generación y Aplicación del Conocimiento - Colegio de Postgraduados: DIVERSIDAD VEGETAL, CAMBIO CLIMÁTICO, PRODUCTIVIDAD Y SEGURIDAD ALIMENTARIA",

    linkText:
      "(https://www.colpos.mx/posgrado/botanica/lgac_m.php)",

    linkUrl:
      "https://www.colpos.mx/posgrado/botanica/lgac_m.php",

    paragraph1:
      "En esta LGAC se investiga la clasificación, filogenia y evolución de caracteres de plantas a nivel específico y supra-específico. Se aplican técnicas de sistemática tradicional, taxonomía numérica, biología molecular y bioinformática.",

    paragraph2:
      "Se integran investigaciones de biología de la conservación, sistemas de información geográfica, modelado del nicho ecológico y distribución potencial de especies. Se analiza la diversidad y estructura de diferentes comunidades vegetales. Se estudia el impacto del cambio climático en los agroecosistemas y en su productividad.",

    mainImage:
      "../imagenesIndex/lgac-face.png"
  },


  /* ---------------------------------------------------------
     PUBLICACIONES
     --------------------------------------------------------- */

  publicaciones: {

    title:
      "PUBLICACIONES SELECTAS, DESCÁRGALAS EN",

    linkText: "Rᵍ",

    linkUrl:
      "https://www.researchgate.net/",

    items: [
      "Villavazo-Hernández, A, Burgos-Hernández, M. & González, D. (2022). Phylogenetic analysis and flower color evolution of the subfamily Linoideae (Linaceae). Plants, 11, 1579.",

      "González-Velasco, J, Burgos-Hernández, M., Galván-Escobedo, I.G., & Castillo-Campos, G. (2022). Taxonomic update of the flax family in Mexico. Phytotaxa, 549(2), 141-184."
    ]
  },


  /* ---------------------------------------------------------
     ALUMNOS
     --------------------------------------------------------- */

  alumnos: {

    vigentesTitle:
      "Alumnos Vigentes",

    graduadosTitle:
      "Alumnos Graduados",

    vigentes: [
      {
        nombre: "Juan Pérez López",
        matricula: "20210001",
        programa: "Maestría en Ciencias",
        correo: "juan.perez@correo.com",
        generacion: "2021 - 2025",
        tesis:
          "Diversidad genética en plantas tropicales",
        foto:
          "../imagenesAlumnos/persona1.jpg"
      }
    ],

    graduados: [
      {
        nombre: "Carlos Hernández Soto",
        matricula: "20180003",
        programa: "Doctorado en Botánica",
        correo:
          "carlos.hernandez@correo.com",
        generacion: "2018 - 2022",
        tesis:
          "Sistemática y conservación de flora mexicana",
        foto:
          "../imagenesAlumnos/persona3.jpg"
      }
    ]
  }
};


/* =========================================================
   4. CLONAR DATOS PREDETERMINADOS
   ========================================================= */

function cloneDefaults() {

  return JSON.parse(
    JSON.stringify(defaultSiteData)
  );
}


/* =========================================================
   5. NORMALIZAR DATOS DEL SITIO
   =========================================================
   Evita errores si localStorage contiene una versión
   antigua o incompleta de siteData.
   ========================================================= */

function normalizeSiteData(parsed) {

  const defaults =
    cloneDefaults();

  parsed =
    parsed &&
    typeof parsed === "object"
      ? parsed
      : {};


  return {

    /* PÁGINA PRINCIPAL */

    index: {

      ...defaults.index,

      ...(parsed.index || {}),

      keywords:
        Array.isArray(
          parsed.index?.keywords
        )
          ? parsed.index.keywords
          : defaults.index.keywords,

      carouselImages:
        Array.isArray(
          parsed.index?.carouselImages
        )
          ? [
              ...parsed.index.carouselImages
            ]
          : [
              ...defaults.index.carouselImages
            ],

      collageImages:
        Array.isArray(
          parsed.index?.collageImages
        )
          ? [
              ...parsed.index.collageImages
            ]
          : [
              ...defaults.index.collageImages
            ]
    },


    /* CURSOS */

    cursos: {

      ...defaults.cursos,

      ...(parsed.cursos || {}),

      itemsLeft:
        Array.isArray(
          parsed.cursos?.itemsLeft
        )
          ? parsed.cursos.itemsLeft
          : defaults.cursos.itemsLeft,

      itemsRight:
        Array.isArray(
          parsed.cursos?.itemsRight
        )
          ? parsed.cursos.itemsRight
          : defaults.cursos.itemsRight,

      sliderImages:
        Array.isArray(
          parsed.cursos?.sliderImages
        )
          ? [
              ...parsed.cursos.sliderImages
            ]
          : [
              ...defaults.cursos.sliderImages
            ]
    },


    /* LGAC */

    lgac: {

      ...defaults.lgac,

      ...(parsed.lgac || {})
    },


    /* PUBLICACIONES */

    publicaciones: {

      ...defaults.publicaciones,

      ...(parsed.publicaciones || {}),

      items:
        Array.isArray(
          parsed.publicaciones?.items
        )
          ? parsed.publicaciones.items
          : defaults.publicaciones.items
    },


    /* ALUMNOS */

    alumnos: {

      ...defaults.alumnos,

      ...(parsed.alumnos || {}),

      vigentes:
        Array.isArray(
          parsed.alumnos?.vigentes
        )
          ? parsed.alumnos.vigentes
          : defaults.alumnos.vigentes,

      graduados:
        Array.isArray(
          parsed.alumnos?.graduados
        )
          ? parsed.alumnos.graduados
          : defaults.alumnos.graduados
    }
  };
}


/* =========================================================
   6. LEER DATOS DE LOCALSTORAGE
   ========================================================= */

function getSiteData() {

  try {

    const raw =
      localStorage.getItem(
        "siteData"
      );


    if (!raw) {

      return cloneDefaults();
    }


    const parsed =
      JSON.parse(raw);


    return normalizeSiteData(
      parsed
    );

  } catch (error) {

    console.error(
      "Error leyendo siteData:",
      error
    );


    return cloneDefaults();
  }
}


/* =========================================================
   7. GUARDAR DATOS EN LOCALSTORAGE
   ========================================================= */

function saveSiteData(
  data,
  showError = true
) {

  try {

    localStorage.setItem(
      "siteData",
      JSON.stringify(data)
    );


    return true;

  } catch (error) {

    console.error(
      "Error guardando siteData:",
      error
    );


    if (showError) {

      if (
        error.name ===
        "QuotaExceededError"
      ) {

        alert(
          "El navegador se quedó sin espacio para guardar más imágenes. Intenta usar menos imágenes o elimina algunas anteriores."
        );

      } else {

        alert(
          "Ocurrió un error al guardar los cambios."
        );
      }
    }


    return false;
  }
}


/* =========================================================
   8. VALIDAR ARCHIVO DE IMAGEN
   ========================================================= */

function isValidImage(file) {

  if (!file) {

    return false;
  }


  /* Debe ser una imagen */

  if (
    !file.type.startsWith(
      "image/"
    )
  ) {

    alert(
      "El archivo seleccionado no es una imagen válida."
    );

    return false;
  }


  /* Evitamos archivos exageradamente grandes */

  if (
    file.size >
    MAX_UPLOAD_SIZE_BYTES
  ) {

    alert(
      `La imagen original es demasiado pesada. Usa una imagen menor a ${MAX_UPLOAD_SIZE_MB} MB.`
    );

    return false;
  }


  return true;
}


/* =========================================================
   9. LEER ARCHIVO COMO DATA URL
   ========================================================= */

function readFileAsDataURL(file) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload = () => {

        resolve(
          reader.result
        );
      };


      reader.onerror = () => {

        reject(
          new Error(
            "No se pudo leer el archivo."
          )
        );
      };


      reader.readAsDataURL(file);
    }
  );
}


/* =========================================================
   10. CARGAR DATA URL COMO IMAGEN
   ========================================================= */

function loadImage(dataUrl) {

  return new Promise(
    (resolve, reject) => {

      const image =
        new Image();


      image.onload = () => {

        resolve(image);
      };


      image.onerror = () => {

        reject(
          new Error(
            "No se pudo procesar la imagen."
          )
        );
      };


      image.src =
        dataUrl;
    }
  );
}


/* =========================================================
   11. CALCULAR TAMAÑO APROXIMADO DE BASE64
   ========================================================= */

function getDataUrlSize(
  dataUrl
) {

  if (
    typeof dataUrl !== "string"
  ) {

    return 0;
  }


  const base64 =
    dataUrl.split(",")[1] || "";


  return Math.ceil(
    base64.length * 0.75
  );
}


/* =========================================================
   12. COMPRIMIR UNA IMAGEN
   =========================================================
   Esta es una de las correcciones más importantes.

   En lugar de guardar directamente una foto de 2, 4 u 8 MB,
   reducimos resolución y peso antes de usar localStorage.
   ========================================================= */

async function compressImage(file) {

  /* Leemos la imagen original */

  const originalDataUrl =
    await readFileAsDataURL(file);


  const image =
    await loadImage(
      originalDataUrl
    );


  /* ---------------------------------------------------------
     CALCULAR NUEVA RESOLUCIÓN
     --------------------------------------------------------- */

  let width =
    image.naturalWidth ||
    image.width;

  let height =
    image.naturalHeight ||
    image.height;


  const ratio =
    Math.min(
      1,
      MAX_IMAGE_WIDTH / width,
      MAX_IMAGE_HEIGHT / height
    );


  width =
    Math.round(
      width * ratio
    );

  height =
    Math.round(
      height * ratio
    );


  /* ---------------------------------------------------------
     CREAR CANVAS
     --------------------------------------------------------- */

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    width;

  canvas.height =
    height;


  const ctx =
    canvas.getContext("2d");


  if (!ctx) {

    throw new Error(
      "El navegador no pudo crear el área de compresión."
    );
  }


  /*
    Fondo blanco.

    Esto evita fondos negros si se convierte un PNG
    transparente a WebP/JPEG.
  */

  ctx.fillStyle =
    "#ffffff";

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  ctx.drawImage(
    image,
    0,
    0,
    width,
    height
  );


  /* ---------------------------------------------------------
     INTENTAR WEBP PRIMERO
     --------------------------------------------------------- */

  let quality =
    0.82;

  let compressed =
    canvas.toDataURL(
      "image/webp",
      quality
    );


  /*
    Bajamos gradualmente la calidad hasta acercarnos
    al peso deseado.
  */

  while (
    getDataUrlSize(compressed) >
      TARGET_IMAGE_SIZE_BYTES &&
    quality > 0.45
  ) {

    quality -= 0.07;


    compressed =
      canvas.toDataURL(
        "image/webp",
        quality
      );
  }


  /* ---------------------------------------------------------
     SI TODAVÍA ES MUY PESADA, REDUCIMOS RESOLUCIÓN
     --------------------------------------------------------- */

  if (
    getDataUrlSize(compressed) >
    TARGET_IMAGE_SIZE_BYTES
  ) {

    const smallerCanvas =
      document.createElement(
        "canvas"
      );


    const scale =
      0.75;


    smallerCanvas.width =
      Math.round(
        width * scale
      );

    smallerCanvas.height =
      Math.round(
        height * scale
      );


    const smallerCtx =
      smallerCanvas.getContext(
        "2d"
      );


    if (smallerCtx) {

      smallerCtx.fillStyle =
        "#ffffff";

      smallerCtx.fillRect(
        0,
        0,
        smallerCanvas.width,
        smallerCanvas.height
      );


      smallerCtx.drawImage(
        canvas,
        0,
        0,
        smallerCanvas.width,
        smallerCanvas.height
      );


      compressed =
        smallerCanvas.toDataURL(
          "image/webp",
          0.65
        );
    }
  }


  return compressed;
}


/* =========================================================
   13. CREAR INPUTS DE IMÁGENES MÚLTIPLES
   ========================================================= */

function createUploadInputs(
  containerId,
  total,
  group,
  field
) {

  const container =
    document.getElementById(
      containerId
    );


  if (!container) {

    return;
  }


  container.innerHTML =
    "";


  for (
    let i = 0;
    i < total;
    i++
  ) {

    const wrapper =
      document.createElement(
        "div"
      );


    wrapper.className =
      "upload-item";


    wrapper.innerHTML = `
      <label>
        ${group} ${i + 1}
      </label>

      <input
        type="file"
        accept="image/*"
        data-group="${group}"
        data-field="${field}"
        data-index="${i}"
      >

      <img
        class="preview"
        id="${group}_${field}_${i}"
        alt="Vista previa ${i + 1}"
      >

      <button
        type="button"
        class="remove-image-btn"
        data-remove-image="${group}"
        data-field="${field}"
        data-index="${i}"
      >
        Quitar imagen
      </button>
    `;


    container.appendChild(
      wrapper
    );
  }
}


/* =========================================================
   14. CREAR INPUT DE UNA SOLA IMAGEN
   ========================================================= */

function createSingleUploadInput(
  containerId,
  group,
  field
) {

  const container =
    document.getElementById(
      containerId
    );


  if (!container) {

    return;
  }


  container.innerHTML = `
    <div class="upload-item">

      <label>
        Imagen principal
      </label>

      <input
        type="file"
        accept="image/*"
        data-group="${group}"
        data-field="${field}"
        data-index="0"
      >

      <img
        class="preview"
        id="${group}_${field}_0"
        alt="Vista previa principal"
      >

      <button
        type="button"
        class="remove-image-btn"
        data-remove-image="${group}"
        data-field="${field}"
        data-index="0"
      >
        Quitar imagen
      </button>

    </div>
  `;
}


/* =========================================================
   15. CREAR ALUMNO VACÍO
   ========================================================= */

function createEmptyStudent() {

  return {

    nombre: "",

    matricula: "",

    programa: "",

    correo: "",

    generacion: "",

    tesis: "",

    foto: ""
  };
}


/* =========================================================
   16. ESCAPAR TEXTO PARA HTML
   =========================================================
   Evita que comillas u otros caracteres rompan los inputs.
   ========================================================= */

function escapeHtml(value) {

  return String(
    value ?? ""
  )

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}


/* =========================================================
   17. MOSTRAR ALUMNOS EN EL PANEL
   ========================================================= */

function renderStudentsAdminList(
  containerId,
  students,
  tipo
) {

  const container =
    document.getElementById(
      containerId
    );


  if (!container) {

    return;
  }


  container.innerHTML =
    "";


  students.forEach(
    (student, index) => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "admin-student-card";


      card.innerHTML = `

        <label>Nombre</label>

        <input
          type="text"
          value="${escapeHtml(student.nombre)}"
          data-tipo="${tipo}"
          data-index="${index}"
          data-field="nombre"
        >


        <label>Matrícula</label>

        <input
          type="text"
          value="${escapeHtml(student.matricula)}"
          data-tipo="${tipo}"
          data-index="${index}"
          data-field="matricula"
        >


        <label>Programa</label>

        <input
          type="text"
          value="${escapeHtml(student.programa)}"
          data-tipo="${tipo}"
          data-index="${index}"
          data-field="programa"
        >


        <label>Correo</label>

        <input
          type="text"
          value="${escapeHtml(student.correo)}"
          data-tipo="${tipo}"
          data-index="${index}"
          data-field="correo"
        >


        <label>Generación</label>

        <input
          type="text"
          value="${escapeHtml(student.generacion)}"
          data-tipo="${tipo}"
          data-index="${index}"
          data-field="generacion"
        >


        <label>Tesis</label>

        <textarea
          data-tipo="${tipo}"
          data-index="${index}"
          data-field="tesis"
        >${escapeHtml(student.tesis)}</textarea>


        <label>Foto</label>

        <input
          type="file"
          accept="image/*"
          data-upload-student="${tipo}"
          data-index="${index}"
        >


        <img
          class="preview"
          src="${escapeHtml(student.foto)}"
          alt="Vista previa del alumno"
        >


        <button
          type="button"
          class="delete-student-btn"
          data-delete-student="${tipo}"
          data-index="${index}"
        >
          Eliminar alumno
        </button>
      `;


      container.appendChild(
        card
      );
    }
  );
}


/* =========================================================
   18. MOSTRAR / OCULTAR PREVIEW
   ========================================================= */

function setPreview(
  imageElement,
  src
) {

  if (!imageElement) {

    return;
  }


  if (
    src &&
    typeof src === "string"
  ) {

    imageElement.src =
      src;

    imageElement.style.display =
      "block";

  } else {

    imageElement.removeAttribute(
      "src"
    );

    imageElement.style.display =
      "none";
  }
}


/* =========================================================
   19. RELLENAR FORMULARIO CON DATOS GUARDADOS
   ========================================================= */

function fillForm(data) {

  /* ---------------- INDEX ---------------- */

  document.getElementById(
    "indexTitle"
  ).value =
    data.index.title || "";


  document.getElementById(
    "indexSubtitle"
  ).value =
    data.index.subtitle || "";


  document.getElementById(
    "indexDescription"
  ).value =
    data.index.description || "";


  document.getElementById(
    "indexButtonText"
  ).value =
    data.index.buttonText || "";


  document.getElementById(
    "indexButtonUrl"
  ).value =
    data.index.buttonUrl || "";


  document.getElementById(
    "indexKeywordsTitle"
  ).value =
    data.index.keywordsTitle || "";


  document.getElementById(
    "indexKeyword1"
  ).value =
    data.index.keywords?.[0] || "";


  document.getElementById(
    "indexKeyword2"
  ).value =
    data.index.keywords?.[1] || "";


  document.getElementById(
    "indexKeyword3"
  ).value =
    data.index.keywords?.[2] || "";


  document.getElementById(
    "indexKeyword4"
  ).value =
    data.index.keywords?.[3] || "";


  /* ---------------- CURSOS ---------------- */

  document.getElementById(
    "coursesTitle"
  ).value =
    data.cursos.title || "";


  document.getElementById(
    "coursesLeft"
  ).value =
    (
      data.cursos.itemsLeft || []
    ).join("\n");


  document.getElementById(
    "coursesRight"
  ).value =
    (
      data.cursos.itemsRight || []
    ).join("\n");


  /* ---------------- LGAC ---------------- */

  document.getElementById(
    "lgacTitle"
  ).value =
    data.lgac.title || "";


  document.getElementById(
    "lgacLinkText"
  ).value =
    data.lgac.linkText || "";


  document.getElementById(
    "lgacLinkUrl"
  ).value =
    data.lgac.linkUrl || "";


  document.getElementById(
    "lgacParagraph1"
  ).value =
    data.lgac.paragraph1 || "";


  document.getElementById(
    "lgacParagraph2"
  ).value =
    data.lgac.paragraph2 || "";


  /* ---------------- PUBLICACIONES ---------------- */

  document.getElementById(
    "pubTitle"
  ).value =
    data.publicaciones.title || "";


  document.getElementById(
    "pubLinkText"
  ).value =
    data.publicaciones.linkText || "";


  document.getElementById(
    "pubLinkUrl"
  ).value =
    data.publicaciones.linkUrl || "";


  document.getElementById(
    "pubItems"
  ).value =
    (
      data.publicaciones.items || []
    ).join("\n");


  /* ---------------- ALUMNOS ---------------- */

  document.getElementById(
    "vigentesTitleInput"
  ).value =
    data.alumnos.vigentesTitle || "";


  document.getElementById(
    "graduadosTitleInput"
  ).value =
    data.alumnos.graduadosTitle || "";


  renderStudentsAdminList(
    "vigentesAdminList",
    data.alumnos.vigentes || [],
    "vigentes"
  );


  renderStudentsAdminList(
    "graduadosAdminList",
    data.alumnos.graduados || [],
    "graduados"
  );


  /* =========================================================
     PREVIEWS DEL CARRUSEL
     ========================================================= */

  (
    data.index.carouselImages ||
    []
  ).forEach(
    (src, i) => {

      const img =
        document.getElementById(
          `indexCarousel_carouselImages_${i}`
        );


      setPreview(
        img,
        src
      );
    }
  );


  /* =========================================================
     PREVIEWS DEL COLLAGE
     ========================================================= */

  (
    data.index.collageImages ||
    []
  ).forEach(
    (src, i) => {

      const img =
        document.getElementById(
          `indexCollage_collageImages_${i}`
        );


      setPreview(
        img,
        src
      );
    }
  );


  /* =========================================================
     PREVIEWS DE CURSOS
     ========================================================= */

  (
    data.cursos.sliderImages ||
    []
  ).forEach(
    (src, i) => {

      const img =
        document.getElementById(
          `coursesSlider_sliderImages_${i}`
        );


      setPreview(
        img,
        src
      );
    }
  );


  /* =========================================================
     PREVIEW LGAC
     ========================================================= */

  const lgacImg =
    document.getElementById(
      "lgacMain_mainImage_0"
    );


  setPreview(
    lgacImg,
    data.lgac.mainImage || ""
  );
}


/* =========================================================
   20. RECOGER DATOS DEL FORMULARIO
   ========================================================= */

function collectFormData(
  current
) {

  return {

    ...current,


    /* ---------------- INDEX ---------------- */

    index: {

      ...current.index,

      title:
        document
          .getElementById(
            "indexTitle"
          )
          .value
          .trim(),

      subtitle:
        document
          .getElementById(
            "indexSubtitle"
          )
          .value
          .trim(),

      description:
        document
          .getElementById(
            "indexDescription"
          )
          .value
          .trim(),

      buttonText:
        document
          .getElementById(
            "indexButtonText"
          )
          .value
          .trim(),

      buttonUrl:
        document
          .getElementById(
            "indexButtonUrl"
          )
          .value
          .trim(),

      keywordsTitle:
        document
          .getElementById(
            "indexKeywordsTitle"
          )
          .value
          .trim(),

      keywords: [

        document
          .getElementById(
            "indexKeyword1"
          )
          .value
          .trim(),

        document
          .getElementById(
            "indexKeyword2"
          )
          .value
          .trim(),

        document
          .getElementById(
            "indexKeyword3"
          )
          .value
          .trim(),

        document
          .getElementById(
            "indexKeyword4"
          )
          .value
          .trim()

      ].filter(Boolean)
    },


    /* ---------------- CURSOS ---------------- */

    cursos: {

      ...current.cursos,

      title:
        document
          .getElementById(
            "coursesTitle"
          )
          .value
          .trim(),

      itemsLeft:
        document
          .getElementById(
            "coursesLeft"
          )
          .value
          .split("\n")
          .map(
            value =>
              value.trim()
          )
          .filter(Boolean),

      itemsRight:
        document
          .getElementById(
            "coursesRight"
          )
          .value
          .split("\n")
          .map(
            value =>
              value.trim()
          )
          .filter(Boolean)
    },


    /* ---------------- LGAC ---------------- */

    lgac: {

      ...current.lgac,

      title:
        document
          .getElementById(
            "lgacTitle"
          )
          .value
          .trim(),

      linkText:
        document
          .getElementById(
            "lgacLinkText"
          )
          .value
          .trim(),

      linkUrl:
        document
          .getElementById(
            "lgacLinkUrl"
          )
          .value
          .trim(),

      paragraph1:
        document
          .getElementById(
            "lgacParagraph1"
          )
          .value
          .trim(),

      paragraph2:
        document
          .getElementById(
            "lgacParagraph2"
          )
          .value
          .trim()
    },


    /* ---------------- PUBLICACIONES ---------------- */

    publicaciones: {

      ...current.publicaciones,

      title:
        document
          .getElementById(
            "pubTitle"
          )
          .value
          .trim(),

      linkText:
        document
          .getElementById(
            "pubLinkText"
          )
          .value
          .trim(),

      linkUrl:
        document
          .getElementById(
            "pubLinkUrl"
          )
          .value
          .trim(),

      items:
        document
          .getElementById(
            "pubItems"
          )
          .value
          .split("\n")
          .map(
            value =>
              value.trim()
          )
          .filter(Boolean)
    },


    /* ---------------- ALUMNOS ---------------- */

    alumnos: {

      ...current.alumnos,

      vigentesTitle:
        document
          .getElementById(
            "vigentesTitleInput"
          )
          .value
          .trim(),

      graduadosTitle:
        document
          .getElementById(
            "graduadosTitleInput"
          )
          .value
          .trim(),

      vigentes:
        current.alumnos.vigentes,

      graduados:
        current.alumnos.graduados
    }
  };
}


/* =========================================================
   21. MOSTRAR PANEL ADMINISTRATIVO
   ========================================================= */

function showPanel() {

  document
    .getElementById(
      "loginView"
    )
    ?.classList
    .add("hidden");


  document
    .getElementById(
      "panelView"
    )
    ?.classList
    .remove("hidden");
}


/* =========================================================
   22. MOSTRAR LOGIN
   ========================================================= */

function showLogin() {

  document
    .getElementById(
      "panelView"
    )
    ?.classList
    .add("hidden");


  document
    .getElementById(
      "loginView"
    )
    ?.classList
    .remove("hidden");
}


/* =========================================================
   23. MOSTRAR MENSAJE TEMPORAL
   ========================================================= */

function showSaveMessage(
  element,
  message,
  duration = 2500
) {

  if (!element) {

    return;
  }


  element.textContent =
    message;


  setTimeout(
    () => {

      element.textContent =
        "";

    },
    duration
  );
}


/* =========================================================
   24. INICIAR ADMINISTRADOR
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* Elementos principales */

    const loginForm =
      document.getElementById(
        "loginForm"
      );

    const loginError =
      document.getElementById(
        "loginError"
      );

    const logoutBtn =
      document.getElementById(
        "logoutBtn"
      );

    const editorForm =
      document.getElementById(
        "editorForm"
      );

    const saveMessage =
      document.getElementById(
        "saveMessage"
      );

    const resetBtn =
      document.getElementById(
        "resetBtn"
      );


    /* =======================================================
       CREAR CONTROLES DE IMÁGENES
       ======================================================= */

    createUploadInputs(
      "indexCarouselUploads",
      6,
      "indexCarousel",
      "carouselImages"
    );


    createUploadInputs(
      "indexCollageUploads",
      18,
      "indexCollage",
      "collageImages"
    );


    createUploadInputs(
      "coursesSliderUploads",
      3,
      "coursesSlider",
      "sliderImages"
    );


    createSingleUploadInput(
      "lgacMainUpload",
      "lgacMain",
      "mainImage"
    );


    /* =======================================================
       LEER DATOS ACTUALES
       ======================================================= */

    let siteData =
      getSiteData();


    /* =======================================================
       SI YA ESTÁ AUTENTICADO
       ======================================================= */

    if (
      sessionStorage.getItem(
        "adminAuthenticated"
      ) === "true"
    ) {

      showPanel();

      fillForm(
        siteData
      );
    }


    /* =======================================================
       LOGIN
       ======================================================= */

    loginForm?.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const user =
          document
            .getElementById(
              "username"
            )
            ?.value
            .trim() || "";


        const pass =
          document
            .getElementById(
              "password"
            )
            ?.value
            .trim() || "";


        if (
          user === ADMIN_USER &&
          pass === ADMIN_PASS
        ) {

          sessionStorage.setItem(
            "adminAuthenticated",
            "true"
          );


          siteData =
            getSiteData();


          showPanel();


          fillForm(
            siteData
          );


          if (loginError) {

            loginError.textContent =
              "";
          }

        } else {

          if (loginError) {

            loginError.textContent =
              "Usuario o contraseña incorrectos.";
          }
        }
      }
    );


    /* =======================================================
       CERRAR SESIÓN
       ======================================================= */

    logoutBtn?.addEventListener(
      "click",
      () => {

        sessionStorage.removeItem(
          "adminAuthenticated"
        );


        showLogin();
      }
    );


    /* =======================================================
       AGREGAR ALUMNO VIGENTE
       ======================================================= */

    document
      .getElementById(
        "addVigenteBtn"
      )
      ?.addEventListener(
        "click",
        () => {

          siteData
            .alumnos
            .vigentes
            .push(
              createEmptyStudent()
            );


          renderStudentsAdminList(
            "vigentesAdminList",
            siteData.alumnos.vigentes,
            "vigentes"
          );
        }
      );


    /* =======================================================
       AGREGAR ALUMNO GRADUADO
       ======================================================= */

    document
      .getElementById(
        "addGraduadoBtn"
      )
      ?.addEventListener(
        "click",
        () => {

          siteData
            .alumnos
            .graduados
            .push(
              createEmptyStudent()
            );


          renderStudentsAdminList(
            "graduadosAdminList",
            siteData.alumnos.graduados,
            "graduados"
          );
        }
      );


    /* =======================================================
       ACTUALIZAR DATOS DE ALUMNOS AL ESCRIBIR
       ======================================================= */

    document.addEventListener(
      "input",
      event => {

        const element =
          event.target;


        const tipo =
          element.dataset?.tipo;


        const index =
          Number(
            element.dataset?.index
          );


        const field =
          element.dataset?.field;


        if (
          !tipo ||
          Number.isNaN(index) ||
          !field
        ) {

          return;
        }


        if (
          !siteData.alumnos ||
          !siteData.alumnos[tipo] ||
          !siteData.alumnos[tipo][index]
        ) {

          return;
        }


        siteData.alumnos[tipo][index][field] =
          element.value;
      }
    );


    /* =======================================================
       SUBIR IMÁGENES
       ======================================================= */

    document.addEventListener(
      "change",
      async event => {

        const input =
          event.target;


        if (
          !(
            input instanceof
            HTMLInputElement
          )
        ) {

          return;
        }


        /* ===================================================
           IMÁGENES GENERALES
           =================================================== */

        if (
          input.matches(
            'input[type="file"]'
          ) &&
          input.dataset.group
        ) {

          const group =
            input.dataset.group;


          const field =
            input.dataset.field;


          const index =
            Number(
              input.dataset.index
            );


          const file =
            input.files?.[0];


          if (!file) {

            return;
          }


          if (
            !isValidImage(file)
          ) {

            input.value = "";

            return;
          }


          try {

            /*
              COMPRIMIR ANTES DE GUARDAR
            */

            const compressed =
              await compressImage(
                file
              );


            /* -----------------------------------------------
               INDEX - CARRUSEL
               ----------------------------------------------- */

            if (
              group ===
              "indexCarousel"
            ) {

              siteData
                .index
                .carouselImages[index] =
                compressed;
            }


            /* -----------------------------------------------
               INDEX - COLLAGE
               ----------------------------------------------- */

            if (
              group ===
              "indexCollage"
            ) {

              siteData
                .index
                .collageImages[index] =
                compressed;
            }


            /* -----------------------------------------------
               CURSOS
               ----------------------------------------------- */

            if (
              group ===
              "coursesSlider"
            ) {

              siteData
                .cursos
                .sliderImages[index] =
                compressed;
            }


            /* -----------------------------------------------
               LGAC
               ----------------------------------------------- */

            if (
              group ===
              "lgacMain"
            ) {

              siteData
                .lgac
                .mainImage =
                compressed;
            }


            /* -----------------------------------------------
               PREVIEW
               ----------------------------------------------- */

            const preview =
              document.getElementById(
                `${group}_${field}_${index}`
              );


            setPreview(
              preview,
              compressed
            );


            /*
              CORRECCIÓN IMPORTANTE:

              Guardamos inmediatamente después de subir
              la imagen.

              Ya no hace falta esperar al botón general.
            */

            const saved =
              saveSiteData(
                siteData
              );


            if (saved) {

              showSaveMessage(
                saveMessage,
                "Imagen guardada correctamente."
              );

            } else {

              /*
                Si falló el almacenamiento,
                recuperamos el último estado válido.
              */

              siteData =
                getSiteData();


              fillForm(
                siteData
              );
            }


            /*
              Limpiamos el input para permitir seleccionar
              nuevamente el mismo archivo si se desea.
            */

            input.value =
              "";

          } catch (error) {

            console.error(
              error
            );


            alert(
              "No se pudo procesar la imagen."
            );


            input.value =
              "";
          }
        }


        /* ===================================================
           FOTO DE ALUMNO
           =================================================== */

        if (
          input.dataset.uploadStudent
        ) {

          const tipo =
            input.dataset.uploadStudent;


          const index =
            Number(
              input.dataset.index
            );


          const file =
            input.files?.[0];


          if (!file) {

            return;
          }


          if (
            !isValidImage(file)
          ) {

            input.value =
              "";

            return;
          }


          try {

            const compressed =
              await compressImage(
                file
              );


            if (
              !siteData
                .alumnos?.[tipo]?.[index]
            ) {

              return;
            }


            siteData
              .alumnos[tipo][index]
              .foto =
              compressed;


            /*
              Guardar inmediatamente.
            */

            const saved =
              saveSiteData(
                siteData
              );


            if (saved) {

              renderStudentsAdminList(

                tipo ===
                "vigentes"
                  ? "vigentesAdminList"
                  : "graduadosAdminList",

                siteData.alumnos[tipo],

                tipo
              );


              showSaveMessage(
                saveMessage,
                "Foto guardada correctamente."
              );

            } else {

              siteData =
                getSiteData();


              fillForm(
                siteData
              );
            }


          } catch (error) {

            console.error(
              error
            );


            alert(
              "No se pudo cargar la foto del alumno."
            );
          }
        }
      }
    );


    /* =======================================================
       BOTONES GENERALES
       ======================================================= */

    document.addEventListener(
      "click",
      event => {

        /* ---------------------------------------------------
           ELIMINAR ALUMNO
           --------------------------------------------------- */

        const deleteButton =
          event.target.closest(
            "[data-delete-student]"
          );


        if (deleteButton) {

          const tipo =
            deleteButton.dataset
              .deleteStudent;


          const index =
            Number(
              deleteButton.dataset
                .index
            );


          if (
            siteData
              .alumnos?.[tipo]
          ) {

            siteData
              .alumnos[tipo]
              .splice(
                index,
                1
              );


            renderStudentsAdminList(

              tipo === "vigentes"
                ? "vigentesAdminList"
                : "graduadosAdminList",

              siteData.alumnos[tipo],

              tipo
            );
          }


          return;
        }


        /* ---------------------------------------------------
           QUITAR IMAGEN
           --------------------------------------------------- */

        const removeImageButton =
          event.target.closest(
            "[data-remove-image]"
          );


        if (
          !removeImageButton
        ) {

          return;
        }


        const group =
          removeImageButton
            .dataset
            .removeImage;


        const field =
          removeImageButton
            .dataset
            .field;


        const index =
          Number(
            removeImageButton
              .dataset
              .index
          );


        /* CARRUSEL */

        if (
          group ===
          "indexCarousel"
        ) {

          siteData
            .index
            .carouselImages[index] =
            "";
        }


        /* COLLAGE */

        if (
          group ===
          "indexCollage"
        ) {

          siteData
            .index
            .collageImages[index] =
            "";
        }


        /* CURSOS */

        if (
          group ===
          "coursesSlider"
        ) {

          siteData
            .cursos
            .sliderImages[index] =
            "";
        }


        /* LGAC */

        if (
          group ===
          "lgacMain"
        ) {

          siteData
            .lgac
            .mainImage =
            "";
        }


        const preview =
          document.getElementById(
            `${group}_${field}_${index}`
          );


        setPreview(
          preview,
          ""
        );


        if (
          saveSiteData(siteData)
        ) {

          showSaveMessage(
            saveMessage,
            "Imagen eliminada."
          );
        }
      }
    );


    /* =======================================================
       GUARDAR TEXTOS Y DEMÁS DATOS
       ======================================================= */

    editorForm?.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        siteData =
          collectFormData(
            siteData
          );


        const saved =
          saveSiteData(
            siteData
          );


        if (saved) {

          showSaveMessage(
            saveMessage,
            "Cambios guardados correctamente."
          );

        } else {

          showSaveMessage(
            saveMessage,
            "No se pudieron guardar los cambios."
          );
        }
      }
    );


    /* =======================================================
       RESTABLECER TODO
       ======================================================= */

    resetBtn?.addEventListener(
      "click",
      () => {

        const confirmed =
          confirm(
            "¿Deseas restablecer todo el contenido? Se eliminarán también las imágenes que hayas subido."
          );


        if (!confirmed) {

          return;
        }


        siteData =
          cloneDefaults();


        const saved =
          saveSiteData(
            siteData
          );


        if (saved) {

          fillForm(
            siteData
          );


          showSaveMessage(
            saveMessage,
            "Contenido restablecido."
          );

        } else {

          showSaveMessage(
            saveMessage,
            "No se pudo restablecer el contenido."
          );
        }
      }
    );
  }
);