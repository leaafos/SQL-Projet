const { extract } = require('./extract/index_csv');
const { transform: transformInsee } = require('./transform/transform_insee');
const { transform: transformPrix } = require('./transform/transform_prix');
const { transform: transformOre } = require('./transform/transform_ore');
const { load } = require('./load/index');

/**
 * Pipeline ETL — Extract, Transform, Load
 *
 * 1. EXTRACT  : Lire les données brutes depuis les fichiers CSV
 * 2. TRANSFORM: Nettoyer, valider et formater les données
 * 3. LOAD     : Insérer les données dans la base de données
 */
async function run() {
  console.log('🚀 Démarrage du pipeline ETL\n');
  console.log('='.repeat(50));

  // 1. Extract
  const rawInsee = await extract('./data/Insee RP Hist 1968.csv');
  const rawPrix = await extract('./data/Niveaux de prix TRVG.csv');
  const rawOre = await extract('./data/ORE-consommation-electrique-par-secteur-dactivite-commune_20251203_171113.csv');

  // 2. Transform
  const inseeData = transformInsee(rawInsee);
  const prixData = transformPrix(rawPrix);
  const oreData = transformOre(rawOre);

  // 3. Load
  await load({ inseeData, prixData, oreData });

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Pipeline ETL terminé avec succès !');
}

run().catch((err) => {
  console.error('❌ Erreur dans le pipeline ETL :', err);
  process.exit(1);
});
