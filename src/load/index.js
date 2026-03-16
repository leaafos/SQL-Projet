const knex = require('knex');
const pkg = require('../../package.json');

/**
 * LOAD — Insère les données transformées dans la base de données
 */

function getDb() {
  return knex({
    client: pkg.database.client,
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  });
}

async function load(data) {
  const db = getDb();

  console.log('\n💾 [LOAD] Chargement en base de données...');

  try {
    // Vider la table avant insertion
    await db('consommation_gaz').del();
    console.log('   ➜ Table consommation_gaz vidée');

    // Insérer les données Insee
    if (data.inseeData && data.inseeData.length > 0) {
      await db('consommation_gaz').insert(data.inseeData);
      console.log(`   ➜ ${data.inseeData.length} lignes Insee insérées`);
    }

    // Insérer les données Prix
    if (data.prixData && data.prixData.length > 0) {
      await db('consommation_gaz').insert(data.prixData);
      console.log(`   ➜ ${data.prixData.length} lignes Prix insérées`);
    }

    // Insérer les données ORE
    if (data.oreData && data.oreData.length > 0) {
      await db('consommation_gaz').insert(data.oreData);
      console.log(`   ➜ ${data.oreData.length} lignes ORE insérées`);
    }

    // Vérification : compter les lignes
    const totalCount = await db('consommation_gaz').count('id as count').first();
    console.log(`\n📊 Vérification : ${totalCount.count} lignes en base`);

  } finally {
    await db.destroy();
  }
}

module.exports = { load };
