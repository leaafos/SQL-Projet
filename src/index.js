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
  const rawData = extract('./data/sample.json');

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
