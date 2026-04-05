const ADMIN_USER = "mireya-admin";
const ADMIN_PASS = "Botanica2025!";

const defaultSiteData = {
  index: {
    title: "DRA. MIREYA BURGOS",
    subtitle: "Profesora Investigadora",
    description:
      "Investigadora Nacional Nivel I, especializada en sistemática, evolución y genética de poblaciones de plantas. Mi trabajo se enfoca en la conservación y aprovechamiento de la biodiversidad vegetal de México, integrando investigación, docencia y formación de nuevos especialistas.",
    buttonText: "Leer más",
    keywordsTitle: "Palabras Clave",
    keywords: [
      "Dataciones moleculares",
      "Taxonomía",
      "Evolución",
      "Curso de botánica sistemática"
    ],
    carouselImages: Array(6).fill(""),
    collageImages: Array(18).fill("")
  },

  cursos: {
    title: "Cursos como Profesora titular e invitada",
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

  lgac: {
    title:
      "Línea de Generación y Aplicación del Conocimiento - Colegio de Postgraduados: DIVERSIDAD VEGETAL, CAMBIO CLIMÁTICO, PRODUCTIVIDAD Y SEGURIDAD ALIMENTARIA",
    linkText: "(https://www.colpos.mx/posgrado/botanica/lgac_m.php)",
    linkUrl: "https://www.colpos.mx/posgrado/botanica/lgac_m.php",
    paragraph1:
      "En esta LGAC se investiga la clasificación, filogenia y evolución de caracteres de plantas a nivel específico y supra-específico. Se aplican técnicas de sistemática tradicional, taxonomía numérica, biología molecular y bioinformática.",
    paragraph2:
      "Se integran investigaciones de biología de la conservación, sistemas de información geográfica, modelado del nicho ecológico y distribución potencial de especies. Se analiza la diversidad y estructura de diferentes comunidades vegetales. Se estudia el impacto del cambio climático en los agroecosistemas y en su productividad.",
    mainImage: "../imagenesIndex/lgac-face.png"
  },

  publicaciones: {
    title: "PUBLICACIONES SELECTAS, DESCÁRGALAS EN",
    linkText: "Rᵍ",
    linkUrl: "https://www.researchgate.net/",
    items: [
      "Villavazo-Hernández, A, Burgos-Hernández, M. & González, D. (2022). Phylogenetic analysis and flower color evolution of the subfamily Linoideae (Linaceae). Plants, 11, 1579.",
      "González-Velasco, J, Burgos-Hernández, M., Galván-Escobedo, I.G., & Castillo-Campos, G. (2022). Taxonomic update of the flax family in Mexico. Phytotaxa, 549(2), 141-184."
    ]
  },

  alumnos: {
    vigentesTitle: "Alumnos Vigentes",
    graduadosTitle: "Alumnos Graduados",
    vigentes: [
      {
        nombre: "Juan Pérez López",
        matricula: "20210001",
        programa: "Maestría en Ciencias",
        correo: "juan.perez@correo.com",
        generacion: "2021 - 2025",
        tesis: "Diversidad genética en plantas tropicales",
        foto: "../imagenesAlumnos/persona1.jpg"
      }
    ],
    graduados: [
      {
        nombre: "Carlos Hernández Soto",
        matricula: "20180003",
        programa: "Doctorado en Botánica",
        correo: "carlos.hernandez@correo.com",
        generacion: "2018 - 2022",
        tesis: "Sistemática y conservación de flora mexicana",
        foto: "../imagenesAlumnos/persona3.jpg"
      }
    ]
  }
};

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaultSiteData));
}

function normalizeSiteData(parsed) {
  return {
    index: {
      ...cloneDefaults().index,
      ...(parsed.index || {}),
      keywords: Array.isArray(parsed.index?.keywords)
        ? parsed.index.keywords
        : cloneDefaults().index.keywords,
      carouselImages: Array.isArray(parsed.index?.carouselImages)
        ? parsed.index.carouselImages
        : cloneDefaults().index.carouselImages,
      collageImages: Array.isArray(parsed.index?.collageImages)
        ? parsed.index.collageImages
        : cloneDefaults().index.collageImages
    },

    cursos: {
      ...cloneDefaults().cursos,
      ...(parsed.cursos || {}),
      itemsLeft: Array.isArray(parsed.cursos?.itemsLeft)
        ? parsed.cursos.itemsLeft
        : cloneDefaults().cursos.itemsLeft,
      itemsRight: Array.isArray(parsed.cursos?.itemsRight)
        ? parsed.cursos.itemsRight
        : cloneDefaults().cursos.itemsRight,
      sliderImages: Array.isArray(parsed.cursos?.sliderImages)
        ? parsed.cursos.sliderImages
        : cloneDefaults().cursos.sliderImages
    },

    lgac: {
      ...cloneDefaults().lgac,
      ...(parsed.lgac || {})
    },

    publicaciones: {
      ...cloneDefaults().publicaciones,
      ...(parsed.publicaciones || {}),
      items: Array.isArray(parsed.publicaciones?.items)
        ? parsed.publicaciones.items
        : cloneDefaults().publicaciones.items
    },

    alumnos: {
      ...cloneDefaults().alumnos,
      ...(parsed.alumnos || {}),
      vigentes: Array.isArray(parsed.alumnos?.vigentes)
        ? parsed.alumnos.vigentes
        : cloneDefaults().alumnos.vigentes,
      graduados: Array.isArray(parsed.alumnos?.graduados)
        ? parsed.alumnos.graduados
        : cloneDefaults().alumnos.graduados
    }
  };
}

function getSiteData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return cloneDefaults();

    const parsed = JSON.parse(raw);
    return normalizeSiteData(parsed);
  } catch (error) {
    console.error("Error leyendo siteData:", error);
    return cloneDefaults();
  }
}

function saveSiteData(data) {
  localStorage.setItem("siteData", JSON.stringify(data));
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function createUploadInputs(containerId, total, group, field) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < total; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "upload-item";

    wrapper.innerHTML = `
      <label>${group} ${i + 1}</label>
      <input type="file" accept="image/*" data-group="${group}" data-field="${field}" data-index="${i}">
      <img class="preview" id="${group}_${field}_${i}" alt="preview ${i + 1}">
    `;

    container.appendChild(wrapper);
  }
}

function createSingleUploadInput(containerId, group, field) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="upload-item">
      <label>Imagen principal</label>
      <input type="file" accept="image/*" data-group="${group}" data-field="${field}" data-index="0">
      <img class="preview" id="${group}_${field}_0" alt="preview principal">
    </div>
  `;
}

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

function renderStudentsAdminList(containerId, students, tipo) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  students.forEach((student, index) => {
    const card = document.createElement("div");
    card.className = "admin-student-card";

    card.innerHTML = `
      <label>Nombre</label>
      <input type="text" value="${student.nombre || ""}" data-tipo="${tipo}" data-index="${index}" data-field="nombre">

      <label>Matrícula</label>
      <input type="text" value="${student.matricula || ""}" data-tipo="${tipo}" data-index="${index}" data-field="matricula">

      <label>Programa</label>
      <input type="text" value="${student.programa || ""}" data-tipo="${tipo}" data-index="${index}" data-field="programa">

      <label>Correo</label>
      <input type="text" value="${student.correo || ""}" data-tipo="${tipo}" data-index="${index}" data-field="correo">

      <label>Generación</label>
      <input type="text" value="${student.generacion || ""}" data-tipo="${tipo}" data-index="${index}" data-field="generacion">

      <label>Tesis</label>
      <textarea data-tipo="${tipo}" data-index="${index}" data-field="tesis">${student.tesis || ""}</textarea>

      <label>Foto</label>
      <input type="file" accept="image/*" data-upload-student="${tipo}" data-index="${index}">
      <img class="preview" src="${student.foto || ""}" alt="preview">

      <button type="button" class="delete-student-btn" data-delete-student="${tipo}" data-index="${index}">
        Eliminar alumno
      </button>
    `;

    container.appendChild(card);
  });
}

function fillForm(data) {
  // INDEX
  document.getElementById("indexTitle").value = data.index.title || "";
  document.getElementById("indexSubtitle").value = data.index.subtitle || "";
  document.getElementById("indexDescription").value = data.index.description || "";
  document.getElementById("indexButtonText").value = data.index.buttonText || "";
  document.getElementById("indexKeywordsTitle").value = data.index.keywordsTitle || "";
  document.getElementById("indexKeyword1").value = data.index.keywords?.[0] || "";
  document.getElementById("indexKeyword2").value = data.index.keywords?.[1] || "";
  document.getElementById("indexKeyword3").value = data.index.keywords?.[2] || "";
  document.getElementById("indexKeyword4").value = data.index.keywords?.[3] || "";

  // CURSOS
  document.getElementById("coursesTitle").value = data.cursos.title || "";
  document.getElementById("coursesLeft").value = (data.cursos.itemsLeft || []).join("\n");
  document.getElementById("coursesRight").value = (data.cursos.itemsRight || []).join("\n");

  // LGAC
  document.getElementById("lgacTitle").value = data.lgac.title || "";
  document.getElementById("lgacLinkText").value = data.lgac.linkText || "";
  document.getElementById("lgacLinkUrl").value = data.lgac.linkUrl || "";
  document.getElementById("lgacParagraph1").value = data.lgac.paragraph1 || "";
  document.getElementById("lgacParagraph2").value = data.lgac.paragraph2 || "";

  // PUBLICACIONES
  document.getElementById("pubTitle").value = data.publicaciones.title || "";
  document.getElementById("pubLinkText").value = data.publicaciones.linkText || "";
  document.getElementById("pubLinkUrl").value = data.publicaciones.linkUrl || "";
  document.getElementById("pubItems").value = (data.publicaciones.items || []).join("\n");

  // ALUMNOS
  document.getElementById("vigentesTitleInput").value = data.alumnos.vigentesTitle || "";
  document.getElementById("graduadosTitleInput").value = data.alumnos.graduadosTitle || "";

  renderStudentsAdminList("vigentesAdminList", data.alumnos.vigentes || [], "vigentes");
  renderStudentsAdminList("graduadosAdminList", data.alumnos.graduados || [], "graduados");

  // previews
  (data.index.carouselImages || []).forEach((src, i) => {
    const img = document.getElementById(`indexCarousel_carouselImages_${i}`);
    if (img) img.src = src || "";
  });

  (data.index.collageImages || []).forEach((src, i) => {
    const img = document.getElementById(`indexCollage_collageImages_${i}`);
    if (img) img.src = src || "";
  });

  (data.cursos.sliderImages || []).forEach((src, i) => {
    const img = document.getElementById(`coursesSlider_sliderImages_${i}`);
    if (img) img.src = src || "";
  });

  const lgacImg = document.getElementById("lgacMain_mainImage_0");
  if (lgacImg) lgacImg.src = data.lgac.mainImage || "";
}

function collectFormData(current) {
  return {
    ...current,

    index: {
      ...current.index,
      title: document.getElementById("indexTitle").value.trim(),
      subtitle: document.getElementById("indexSubtitle").value.trim(),
      description: document.getElementById("indexDescription").value.trim(),
      buttonText: document.getElementById("indexButtonText").value.trim(),
      keywordsTitle: document.getElementById("indexKeywordsTitle").value.trim(),
      keywords: [
        document.getElementById("indexKeyword1").value.trim(),
        document.getElementById("indexKeyword2").value.trim(),
        document.getElementById("indexKeyword3").value.trim(),
        document.getElementById("indexKeyword4").value.trim()
      ].filter(Boolean)
    },

    cursos: {
      ...current.cursos,
      title: document.getElementById("coursesTitle").value.trim(),
      itemsLeft: document.getElementById("coursesLeft").value.split("\n").map(v => v.trim()).filter(Boolean),
      itemsRight: document.getElementById("coursesRight").value.split("\n").map(v => v.trim()).filter(Boolean)
    },

    lgac: {
      ...current.lgac,
      title: document.getElementById("lgacTitle").value.trim(),
      linkText: document.getElementById("lgacLinkText").value.trim(),
      linkUrl: document.getElementById("lgacLinkUrl").value.trim(),
      paragraph1: document.getElementById("lgacParagraph1").value.trim(),
      paragraph2: document.getElementById("lgacParagraph2").value.trim()
    },

    publicaciones: {
      ...current.publicaciones,
      title: document.getElementById("pubTitle").value.trim(),
      linkText: document.getElementById("pubLinkText").value.trim(),
      linkUrl: document.getElementById("pubLinkUrl").value.trim(),
      items: document.getElementById("pubItems").value.split("\n").map(v => v.trim()).filter(Boolean)
    },

    alumnos: {
      ...current.alumnos,
      vigentesTitle: document.getElementById("vigentesTitleInput").value.trim(),
      graduadosTitle: document.getElementById("graduadosTitleInput").value.trim(),
      vigentes: current.alumnos.vigentes,
      graduados: current.alumnos.graduados
    }
  };
}

function showPanel() {
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("panelView").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("panelView").classList.add("hidden");
  document.getElementById("loginView").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const logoutBtn = document.getElementById("logoutBtn");
  const editorForm = document.getElementById("editorForm");
  const saveMessage = document.getElementById("saveMessage");
  const resetBtn = document.getElementById("resetBtn");

  createUploadInputs("indexCarouselUploads", 6, "indexCarousel", "carouselImages");
  createUploadInputs("indexCollageUploads", 18, "indexCollage", "collageImages");
  createUploadInputs("coursesSliderUploads", 3, "coursesSlider", "sliderImages");
  createSingleUploadInput("lgacMainUpload", "lgacMain", "mainImage");

  let siteData = getSiteData();

  if (sessionStorage.getItem("adminAuthenticated") === "true") {
    showPanel();
    fillForm(siteData);
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("adminAuthenticated", "true");
      showPanel();
      fillForm(siteData);
      loginError.textContent = "";
    } else {
      loginError.textContent = "Usuario o contraseña incorrectos.";
    }
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("adminAuthenticated");
    showLogin();
  });

  document.getElementById("addVigenteBtn")?.addEventListener("click", () => {
    siteData.alumnos.vigentes.push(createEmptyStudent());
    renderStudentsAdminList("vigentesAdminList", siteData.alumnos.vigentes, "vigentes");
  });

  document.getElementById("addGraduadoBtn")?.addEventListener("click", () => {
    siteData.alumnos.graduados.push(createEmptyStudent());
    renderStudentsAdminList("graduadosAdminList", siteData.alumnos.graduados, "graduados");
  });

  document.addEventListener("input", (e) => {
    const el = e.target;
    const tipo = el.dataset.tipo;
    const index = Number(el.dataset.index);
    const field = el.dataset.field;

    if (!tipo || Number.isNaN(index) || !field) return;
    if (!siteData.alumnos || !siteData.alumnos[tipo] || !siteData.alumnos[tipo][index]) return;

    siteData.alumnos[tipo][index][field] = el.value;
  });

  document.addEventListener("change", async (e) => {
    const input = e.target;

    if (input.matches('input[type="file"]') && input.dataset.group) {
      const group = input.dataset.group;
      const field = input.dataset.field;
      const index = Number(input.dataset.index);
      const file = input.files?.[0];

      if (!file) return;

      const base64 = await readFileAsDataURL(file);

      if (group === "indexCarousel") siteData.index.carouselImages[index] = base64;
      if (group === "indexCollage") siteData.index.collageImages[index] = base64;
      if (group === "coursesSlider") siteData.cursos.sliderImages[index] = base64;
      if (group === "lgacMain") siteData.lgac.mainImage = base64;

      const preview = document.getElementById(`${group}_${field}_${index}`);
      if (preview) preview.src = base64;
    }

    if (input.dataset.uploadStudent) {
      const tipo = input.dataset.uploadStudent;
      const index = Number(input.dataset.index);
      const file = input.files?.[0];

      if (!file) return;

      const base64 = await readFileAsDataURL(file);
      siteData.alumnos[tipo][index].foto = base64;

      renderStudentsAdminList(
        tipo === "vigentes" ? "vigentesAdminList" : "graduadosAdminList",
        siteData.alumnos[tipo],
        tipo
      );
    }
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete-student]");
    if (!btn) return;

    const tipo = btn.dataset.deleteStudent;
    const index = Number(btn.dataset.index);

    siteData.alumnos[tipo].splice(index, 1);

    renderStudentsAdminList(
      tipo === "vigentes" ? "vigentesAdminList" : "graduadosAdminList",
      siteData.alumnos[tipo],
      tipo
    );
  });

  editorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    siteData = collectFormData(siteData);
    saveSiteData(siteData);
    saveMessage.textContent = "Cambios guardados correctamente.";
    setTimeout(() => saveMessage.textContent = "", 2500);
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("¿Deseas restablecer todo el contenido?")) return;
    siteData = cloneDefaults();
    saveSiteData(siteData);
    fillForm(siteData);
    saveMessage.textContent = "Contenido restablecido.";
    setTimeout(() => saveMessage.textContent = "", 2500);
  });
});