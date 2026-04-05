const defaultCoursesData = {
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
};

function normalizeCoursesData(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return { ...defaultCoursesData };
  }

  if (parsed.cursos && typeof parsed.cursos === "object") {
    return {
      ...defaultCoursesData,
      ...parsed.cursos,
      itemsLeft: Array.isArray(parsed.cursos.itemsLeft)
        ? parsed.cursos.itemsLeft
        : defaultCoursesData.itemsLeft,
      itemsRight: Array.isArray(parsed.cursos.itemsRight)
        ? parsed.cursos.itemsRight
        : defaultCoursesData.itemsRight,
      sliderImages: Array.isArray(parsed.cursos.sliderImages) && parsed.cursos.sliderImages.length
        ? parsed.cursos.sliderImages
        : defaultCoursesData.sliderImages
    };
  }

  return { ...defaultCoursesData };
}

function getCoursesData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return { ...defaultCoursesData };

    const parsed = JSON.parse(raw);
    return normalizeCoursesData(parsed);
  } catch (error) {
    console.error("Error leyendo datos de cursos:", error);
    return { ...defaultCoursesData };
  }
}

function fillCourseList(elementId, items) {
  const list = document.getElementById(elementId);
  if (!list) return;

  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa-solid fa-leaf"></i> ${item}`;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getCoursesData();

  const titleEl = document.getElementById("coursesTitle");
  const sliderImage = document.getElementById("sliderImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (titleEl) {
    titleEl.textContent = data.title;
  }

  fillCourseList("coursesListLeft", data.itemsLeft || []);
  fillCourseList("coursesListRight", data.itemsRight || []);

  const images = (data.sliderImages || []).filter(Boolean);

  if (!sliderImage || !prevBtn || !nextBtn || !images.length) return;

  let currentIndex = 0;
  let autoSlide = null;

  sliderImage.style.transition = "opacity 0.25s ease-in-out";
  sliderImage.src = images[currentIndex];

  function showImage(index) {
    sliderImage.style.opacity = "0";

    setTimeout(() => {
      sliderImage.src = images[index];
      sliderImage.style.opacity = "1";
    }, 180);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  function startAutoSlide() {
    if (images.length <= 1) return;
    autoSlide = setInterval(nextImage, 5000);
  }

  function resetAutoSlide() {
    if (autoSlide) clearInterval(autoSlide);
    startAutoSlide();
  }

  nextBtn.addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
  });

  startAutoSlide();
});