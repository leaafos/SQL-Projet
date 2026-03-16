const knex = require('knex');
const pkg = require('../package.json');

const db = knex({
  client: pkg.database.client,
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
});

async function createTables() {
  // Table users
  const usersExists = await db.schema.hasTable('users');
  if (!usersExists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    });
    console.log('✅ Table "users" créée');
  } else {
    console.log('ℹ️  Table "users" existe déjà');
  }

  // Table posts
  const postsExists = await db.schema.hasTable('posts');
  if (!postsExists) {
    await db.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
    console.log('✅ Table "posts" créée');
  } else {
    console.log('ℹ️  Table "posts" existe déjà');
  }
}

createTables()
  .then(() => {
    console.log('\n🎉 Migration terminée avec succès');
    return db.destroy();
  })
  .catch((err) => {
    console.error('❌ Erreur lors de la migration :', err);
    return db.destroy();
  });
