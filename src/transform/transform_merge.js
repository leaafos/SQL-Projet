/**
 * TRANSFORM MERGE — Assemble les 3 datasets en une seule table en reliant les lignes par code_insee
 */
function transformMerge(inseeData, prixData, oreData) {
  console.log('\n🔄 [TRANSFORM MERGE] Assemblage des 3 datasets par code_insee...');

  const prixMap = new Map();
  for (const row of prixData) {
    if (row.code_insee) prixMap.set(row.code_insee, row);
  }

  const oreMap = new Map();
  for (const row of oreData) {
    if (row.code_insee) oreMap.set(row.code_insee, row);
  }

  const mergedData = [];
  for (const insee of inseeData) {
    const codeInsee = insee.code_insee;
    if (!codeInsee) continue;

    const prix = prixMap.get(codeInsee);
    const ore = oreMap.get(codeInsee);
    if (!prix || !ore) continue;

    mergedData.push({
      code_postal: prix.code_postal,
      commune: insee.commune,
      annee_habitants: insee.annee_habitants,
      nombre_habitants_par_commune: insee.nombre_habitants_par_commune,
      niveau_prix: prix.niveau_prix,
      consommation_totale: ore.consommation_totale,
      consommation_moyenne: ore.consommation_moyenne,
      gaz: ore.gaz,
      annee_consommation: ore.annee_consommation
    });
  }

  console.log(`   ➜ ${mergedData.length} lignes assemblées (code_insee présent dans les 3 datasets)`);
  return mergedData;
}

module.exports = { transformMerge };
