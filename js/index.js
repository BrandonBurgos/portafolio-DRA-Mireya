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
  carouselImages: [],
  collageImages: []
};

function normalizeIndexData(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return { ...defaultData };
  }

  if (parsed.index && typeof parsed.index === "object") {
    return {
      ...defaultData,
      ...parsed.index,
      buttonText: parsed.index.buttonText || defaultData.buttonText,
      buttonUrl: parsed.index.buttonUrl || defaultData.buttonUrl,
      keywords: Array.isArray(parsed.index.keywords)
        ? parsed.index.keywords
        : defaultData.keywords,
      carouselImages: Array.isArray(parsed.index.carouselImages)
        ? parsed.index.carouselImages
        : defaultData.carouselImages,
      collageImages: Array.isArray(parsed.index.collageImages)
        ? parsed.index.collageImages
        : defaultData.collageImages
    };
  }

  return {
    ...defaultData,
    title: parsed.title || defaultData.title,
    subtitle: parsed.subtitle || defaultData.subtitle,
    description: parsed.description || defaultData.description,
    buttonText: parsed.buttonText || parsed.button || defaultData.buttonText,
    buttonUrl: parsed.buttonUrl || parsed.buttonLink || defaultData.buttonUrl,
    keywordsTitle: parsed.keywordsTitle || defaultData.keywordsTitle,
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords : defaultData.keywords,
    carouselImages: Array.isArray(parsed.carousel)
      ? parsed.carousel
      : Array.isArray(parsed.carouselImages)
      ? parsed.carouselImages
      : defaultData.carouselImages,
    collageImages: Array.isArray(parsed.collage)
      ? parsed.collage
      : Array.isArray(parsed.collageImages)
      ? parsed.collageImages
      : defaultData.collageImages
  };
}

function getSiteData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return { ...defaultData };

    const parsed = JSON.parse(raw);
    return normalizeIndexData(parsed);
  } catch (error) {
    console.error("Error leyendo siteData:", error);
    return { ...defaultData };
  }
}

function applyTextContent(data) {
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");
  const descriptionEl = document.getElementById("description");
  const buttonEl = document.getElementById("readMore");
  const keywordsTitleEl = document.getElementById("keywordsTitle");
  const keywordsListEl = document.getElementById("keywordsList");

  if (titleEl) titleEl.textContent = data.title || "";
  if (subtitleEl) subtitleEl.textContent = data.subtitle || "";
  if (descriptionEl) descriptionEl.textContent = data.description || "";
  if (keywordsTitleEl) keywordsTitleEl.textContent = data.keywordsTitle || "";

  if (buttonEl) {
    buttonEl.textContent = data.buttonText || "Leer más";

    if (buttonEl.tagName.toLowerCase() === "a") {
      buttonEl.setAttribute("href", data.buttonUrl || "html/alumnos.html");
    } else {
      buttonEl.onclick = () => {
        window.location.href = data.buttonUrl || "html/alumnos.html";
      };
    }
  }

  if (keywordsListEl) {
    keywordsListEl.innerHTML = "";
    (data.keywords || []).forEach((keyword) => {
      const li = document.createElement("li");
      li.textContent = keyword;
      keywordsListEl.appendChild(li);
    });
  }
}

function applyImages(selector, imagesArray) {
  const imgElements = document.querySelectorAll(selector);

  imgElements.forEach((img, index) => {
    const src = imagesArray?.[index];

    if (src && typeof src === "string" && src.trim() !== "") {
      img.src = src;
    }
  });
}

function updateCarousel() {
  images.forEach((img, i) => {
    let offset = i - currentIndex;

    if (offset > images.length / 2) offset -= images.length;
    if (offset < -images.length / 2) offset += images.length;

    img.style.position = "absolute";
    img.style.transition = "transform 0.4s ease, opacity 0.4s ease, z-index 0.4s ease";

    if (offset === 0) {
      img.style.transform = "translateX(0) scale(1.2)";
      img.style.zIndex = "5";
      img.style.opacity = "1";
    } else if (offset === -1) {
      img.style.transform = "translateX(-220px) scale(1)";
      img.style.zIndex = "4";
      img.style.opacity = "0.9";
    } else if (offset === 1) {
      img.style.transform = "translateX(220px) scale(1)";
      img.style.zIndex = "4";
      img.style.opacity = "0.9";
    } else if (offset === -2) {
      img.style.transform = "translateX(-420px) scale(0.8)";
      img.style.zIndex = "3";
      img.style.opacity = "0.6";
    } else if (offset === 2) {
      img.style.transform = "translateX(420px) scale(0.8)";
      img.style.zIndex = "3";
      img.style.opacity = "0.6";
    } else {
      img.style.transform = "translateX(0) scale(0.6)";
      img.style.zIndex = "1";
      img.style.opacity = "0";
    }
  });


  prev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  next.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  updateCarousel();
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getSiteData();

  applyTextContent(data);
  applyImages(".carousel img", data.carouselImages);
  applyImages(".collage img", data.collageImages);

  initCarousel();
});