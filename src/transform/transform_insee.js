/**
 * TRANSFORM — Nettoie, valide et formate les données du fichier Insee RP Hist 1968.csv
 */
function transform(data) {
  console.log('\n🔄 [TRANSFORM INSEE] Transformation des données Insee...');

  // Sélectionner et renommer les colonnes : codegeo → code_postal, libgeo → commune, an → annee_habitants, p_pop → nombre_habitants_par_commune
  const transformedData = data.map((row) => ({
    code_postal: row.codegeo ? row.codegeo.trim() : null,
    commune: row.libgeo ? row.libgeo.trim() : null,
    annee_habitants: row.an ? parseInt(row.an) : null,
    nombre_habitants_par_commune: row.p_pop ? parseInt(row.p_pop) : null
  }));

  console.log(`   ➜ ${transformedData.length} lignes transformées`);

  return transformedData;
}

module.exports = { transform };