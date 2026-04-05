const defaultAlumnosData = {
  alumnos: {
    vigentesTitle: "Alumnos Vigentes",
    graduadosTitle: "Alumnos Graduados",
    vigentes: [],
    graduados: []
  }
};

function getAlumnosData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return defaultAlumnosData.alumnos;

    const parsed = JSON.parse(raw);

    return {
      ...defaultAlumnosData.alumnos,
      ...(parsed.alumnos || {})
    };
  } catch (error) {
    console.error("Error leyendo alumnos:", error);
    return defaultAlumnosData.alumnos;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getAlumnosData();

  const vigentesTitle = document.getElementById("vigentesHomeTitle");
  const graduadosTitle = document.getElementById("graduadosHomeTitle");

  if (vigentesTitle) vigentesTitle.textContent = data.vigentesTitle || "Alumnos Vigentes";
  if (graduadosTitle) graduadosTitle.textContent = data.graduadosTitle || "Alumnos Graduados";
});