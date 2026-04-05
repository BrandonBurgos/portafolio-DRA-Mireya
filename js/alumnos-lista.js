const defaultAlumnosData = {
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

function getAlumnosData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return defaultAlumnosData.alumnos;

    const parsed = JSON.parse(raw);

    return {
      ...defaultAlumnosData.alumnos,
      ...(parsed.alumnos || {}),
      vigentes: Array.isArray(parsed.alumnos?.vigentes)
        ? parsed.alumnos.vigentes
        : defaultAlumnosData.alumnos.vigentes,
      graduados: Array.isArray(parsed.alumnos?.graduados)
        ? parsed.alumnos.graduados
        : defaultAlumnosData.alumnos.graduados
    };
  } catch (error) {
    console.error("Error leyendo alumnos:", error);
    return defaultAlumnosData.alumnos;
  }
}

function createAlumnoCard(alumno) {
  const section = document.createElement("section");
  section.className = "alumno";

  section.innerHTML = `
    <div class="alumno-foto">
      <img src="${alumno.foto || '../imagenesAlumnos/persona1.jpg'}" alt="${alumno.nombre || 'Alumno'}">
      <span class="nombre">${alumno.nombre || ''}</span>
    </div>

    <div class="alumno-info">
      ${alumno.matricula ? `<p><strong>Matrícula:</strong> ${alumno.matricula}</p>` : ""}
      ${alumno.programa ? `<p><strong>Programa:</strong> ${alumno.programa}</p>` : ""}
      ${alumno.correo ? `<p><strong>Correo:</strong> ${alumno.correo}</p>` : ""}
      ${alumno.generacion ? `<p><strong>Generación:</strong> ${alumno.generacion}</p>` : ""}
      ${alumno.tesis ? `<p><strong>Tesis:</strong> ${alumno.tesis}</p>` : ""}
    </div>
  `;

  return section;
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getAlumnosData();
  const contenedor = document.getElementById("lista-alumnos");
  const titulo = document.getElementById("titulo");

  if (!contenedor) return;

  const tipo = contenedor.dataset.tipo;
  const alumnos = tipo === "graduados" ? data.graduados : data.vigentes;

  if (titulo) {
    titulo.textContent = tipo === "graduados"
      ? (data.graduadosTitle || "Alumnos Graduados")
      : (data.vigentesTitle || "Alumnos Vigentes");
  }

  contenedor.innerHTML = "";

  alumnos.forEach((alumno) => {
    contenedor.appendChild(createAlumnoCard(alumno));
  });
});