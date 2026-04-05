const defaultPublicacionesData = {
  title: "PUBLIPUBLICACIONES SELECTAS, DESCÁRGALAS EN",
  linkText: "Rᵍ",
  linkUrl: "https://www.researchgate.net/",
  items: [
    "Villavazo-Hernández, A, Burgos-Hernández, M. & González, D. (2022). Phylogenetic analysis and flower color evolution of the subfamily Linoideae (Linaceae). Plants, 11, 1579.",
    "González-Velasco, J, Burgos-Hernández, M., Galván-Escobedo, I.G., & Castillo-Campos, G. (2022). Taxonomic update of the flax family in Mexico. Phytotaxa, 549(2), 141-184.",
    "Hurtado-Reveles, L., Burgos-Hernández, M., López-Acosta, J. C., & Vázquez-Sánchez, M. (2021). Importance of local studies of vascular plant communities in conservation and management: A case study in Susticacán, Zacatecas, Mexico. Diversity, 13(10), 492.",
    "Burgos-Hernández, M., & Castillo-Campos, G. (2020). Taxonomic revision of the Mesoamerican genus Spathacanthus (Justicieae, Acanthoideae, Acanthaceae). PhytoKeys, 144, 31.",
    "Burgos-Hernández, M., Pozo, C., & González, D. (2019). Evolutionary history of Musaceae: ancient distribution and the rise of modern lineages. Botanical Journal of the Linnean Society, 189(1), 23-35.",
    "Burgos-Hernández, M., & Castillo-Campos, G. (2018). Floristic analysis of the tropical evergreen forest in the center-north of Veracruz, Mexico. Ecosist. Recur. Agropec. 5(15), 451-463.",
    "Burgos-Hernández, M., González, D., & Castillo-Campos, G. (2017). Phylogenetic position of the disjunct species Musa ornata (Musaceae): first approach to understand its distribution. Genetic Resources and Crop Evolution, 64(8), 1889-1904."
  ]
};

function normalizePublicacionesData(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return { ...defaultPublicacionesData };
  }

  if (parsed.publicaciones && typeof parsed.publicaciones === "object") {
    return {
      ...defaultPublicacionesData,
      ...parsed.publicaciones,
      items: Array.isArray(parsed.publicaciones.items)
        ? parsed.publicaciones.items
        : defaultPublicacionesData.items
    };
  }

  return { ...defaultPublicacionesData };
}

function getPublicacionesData() {
  try {
    const raw = localStorage.getItem("siteData");
    if (!raw) return { ...defaultPublicacionesData };

    const parsed = JSON.parse(raw);
    return normalizePublicacionesData(parsed);
  } catch (error) {
    console.error("Error leyendo datos de publicaciones:", error);
    return { ...defaultPublicacionesData };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getPublicacionesData();

  const title = document.getElementById("pubTitle");
  const link = document.getElementById("pubLink");
  const list = document.getElementById("pubList");

  if (title) {
    title.textContent = data.title || defaultPublicacionesData.title;
  }

  if (link) {
    link.textContent = data.linkText || defaultPublicacionesData.linkText;
    link.href = data.linkUrl || defaultPublicacionesData.linkUrl;
  }

  if (list) {
    list.innerHTML = "";

    (data.items || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }
});