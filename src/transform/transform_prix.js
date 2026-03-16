/**
 * TRANSFORM — Nettoie, valide et formate les données du fichier Niveaux de prix TRVG.csv
 */
function transform(data) {
  console.log('\n🔄 [TRANSFORM PRIX] Transformation des données de prix...');

  // Sélectionner et renommer les colonnes : CODE_INSEE → code_insee, CODE_POSTAL → code_postal, NIVEAU_PRIX → niveau_prix
  const transformedData = data.map((row) => ({
    code_insee: row.CODE_INSEE ? row.CODE_INSEE.trim() : null,
    code_postal: row.CODE_POSTAL ? row.CODE_POSTAL.trim() : null,
    niveau_prix: row.NIVEAU_PRIX ? row.NIVEAU_PRIX.trim() : null
  }));

  console.log(`   ➜ ${transformedData.length} lignes transformées`);

  return transformedData;
}

module.exports = { transform };