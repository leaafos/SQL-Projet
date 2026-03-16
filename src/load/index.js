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

async function insertInBatches(db, rows, label) {
  if (!rows || rows.length === 0) return;

  const nbCols = Object.keys(rows[0]).length;
  const chunkSize = Math.floor(999 / nbCols) || 1;

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    await db('consommation_gaz').insert(chunk);
  }

  console.log(`   ➜ ${rows.length} lignes ${label} insérées`);
}

async function load(data) {
  const db = getDb();

  console.log('\n💾 [LOAD] Chargement en base de données...');

  try {
    // Vider la table avant insertion
    await db('consommation_gaz').del();
    console.log('   ➜ Table consommation_gaz vidée');

    if (data.mergedData && data.mergedData.length > 0) {
      await insertInBatches(db, data.mergedData, 'merged');
    } else {
      console.log('   ➜ Aucune donnée à insérer (merge vide)');
    }

    // Vérification : compter les lignes
    const totalCount = await db('consommation_gaz').count('id as count').first();
    console.log(`\n📊 Vérification : ${totalCount.count} lignes en base`);

  } finally {
    await db.destroy();
  }
}

module.exports = { load };
