/**
 * TRANSFORM — Nettoie, valide et formate les données du fichier ORE-consommation-electrique-par-secteur-dactivite-commune_20251203_171113.csv
 */
function transform(data) {
  console.log('\n🔄 [TRANSFORM ORE] Transformation des données ORE...');

  // Sélectionner et renommer les colonnes : Code Commune → code_insee, Conso totale (MWh) → consommation_totale, Conso moyenne (MWh) → consommation_moyenne, FILIERE → gaz, Année → annee_consommation
  const transformedData = data.map((row) => ({
    code_insee: row['Code Commune'] ? row['Code Commune'].trim() : null,
    consommation_totale: row['Conso totale (MWh)'] ? parseFloat(row['Conso totale (MWh)']) : null,
    consommation_moyenne: row['Conso moyenne (MWh)'] ? parseFloat(row['Conso moyenne (MWh)']) : null,
    gaz: row.FILIERE ? row.FILIERE.trim() : null,
    annee_consommation: row.Année ? parseInt(row.Année) : null
  }));

  console.log(`   ➜ ${transformedData.length} lignes transformées`);

  return transformedData;
}

module.exports = { transform };