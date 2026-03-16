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
    // Vider les tables avant insertion (ordre important pour les FK)
    await db('posts').del();
    await db('users').del();
    console.log('   ➜ Tables vidées');

    // Insérer les users
    await db('users').insert(data.users);
    console.log(`   ➜ ${data.users.length} users insérés`);

    // Insérer les posts
    await db('posts').insert(data.posts);
    console.log(`   ➜ ${data.posts.length} posts insérés`);

    // Vérification : relire les données
    const usersCount = await db('users').count('id as count').first();
    const postsCount = await db('posts').count('id as count').first();
    console.log(`\n📊 Vérification : ${usersCount.count} users, ${postsCount.count} posts en base`);

  } finally {
    await db.destroy();
  }
}

module.exports = { load };
