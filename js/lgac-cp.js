const defaultLgacData = {
  title:
    "Línea de Generación y Aplicación del Conocimiento - Colegio de Postgraduados: DIVERSIDAD VEGETAL, CAMBIO CLIMÁTICO, PRODUCTIVIDAD Y SEGURIDAD ALIMENTARIA",
  linkText: "(https://www.colpos.mx/posgrado/botanica/lgac_m.php)",
  linkUrl: "https://www.colpos.mx/posgrado/botanica/lgac_m.php",
  paragraph1:
    "En esta LGAC se investiga la clasificación, filogenia y evolución de caracteres de plantas a nivel específico y supra-específico. Se aplican técnicas de sistemática tradicional, taxonomía numérica, biología molecular y bioinformática.",
  paragraph2:
    "Se integran investigaciones de biología de la conservación, sistemas de información geográfica, modelado del nicho ecológico y distribución potencial de especies. Se analiza la diversidad y estructura de diferentes comunidades vegetales. Se estudia el impacto del cambio climático en los agroecosistemas y en su productividad.",
  mainImage: "../imagenesIndex/lgac-face.png"
};

function normalizeLgacData(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return { ...defaultLgacData };
  }

  if (parsed.lgac && typeof parsed.lgac === "object") {
    return {
      ...defaultLgacData,
      ...parsed.lgac
    };
  }

  return { ...defaultLgacData };
}

function getLgacData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return { ...defaultLgacData };

    const parsed = JSON.parse(raw);
    return normalizeLgacData(parsed);
  } catch (error) {
    console.error("Error leyendo datos LGAC:", error);
    return { ...defaultLgacData };
  }
}

function applyLgacContent(data) {
  const titleEl = document.getElementById("lgacTitle");
  const linkEl = document.getElementById("lgacLink");
  const paragraph1El = document.getElementById("lgacParagraph1");
  const paragraph2El = document.getElementById("lgacParagraph2");
  const mainImageEl = document.getElementById("lgacMainImage");

  if (titleEl) titleEl.textContent = data.title || "";
  if (paragraph1El) paragraph1El.textContent = data.paragraph1 || "";
  if (paragraph2El) paragraph2El.textContent = data.paragraph2 || "";

  if (linkEl) {
    linkEl.textContent = data.linkText || "";
    linkEl.href = data.linkUrl || "#";
  }

  if (mainImageEl && data.mainImage) {
    mainImageEl.src = data.mainImage;
  }
}

function animateStars() {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, index) => {
    let direction = index % 2 === 0 ? 1 : -1;
    let angle = 0;

    setInterval(() => {
      angle += 0.4 * direction;
      star.style.transform = `rotate(${angle}deg)`;
    }, 30);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getLgacData();

  applyLgacContent(data);
  animateStars();
});