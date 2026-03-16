const { extract } = require('./extract/index');
const { transform } = require('./transform/index');
const { load } = require('./load/index');

/**
 * Pipeline ETL — Extract, Transform, Load
 *
 * 1. EXTRACT  : Lire les données brutes depuis un fichier JSON
 * 2. TRANSFORM: Nettoyer, valider et formater les données
 * 3. LOAD     : Insérer les données dans la base de données
 */
async function run() {
  console.log('🚀 Démarrage du pipeline ETL\n');
  console.log('='.repeat(50));

  // 1. Extract
  await extract('./data/Insee RP Hist 1968.csv');
  await extract('./data/Niveaux de prix TRVG.csv');
  await extract('./data/ORE-consommation-electrique-par-secteur-dactivite-commune_20251203_171113.csv');
  const rawData = { users: [], posts: [] };

  // 2. Transform
  const cleanData = transform(rawData);

  // 3. Load
  await load(cleanData);

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Pipeline ETL terminé avec succès !');
}

run().catch((err) => {
  console.error('❌ Erreur dans le pipeline ETL :', err);
  process.exit(1);
});
