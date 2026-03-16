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

  
  const consomationExists = await db.schema.hasTable('consommation_gaz');

  if (!consomationExists) {
    await db.schema.createTable('consommation_gaz', (table) => {
      table.increments('id').primary();

      table.string('commune').notNullable();
      table.string('code_postal').notNullable();

      table.integer('niveau_prix');

      table.integer('nombre_habitants_par_commune');

      table.integer('annee_habitants');
      table.integer('annee_consommation');

      table.float('consommation_totale');
      table.float('consommation_moyenne');

      table.timestamps(true, true);
    });

    console.log('Table "consommation_gaz" créée');
  } else {
    console.log('Table "consommation_gaz" existe déjà');
  }
}

createTables()
  .then(() => {
    console.log('\n Migration terminée avec succès');
    return db.destroy();
  })
  .catch((err) => {
    console.error(' Erreur lors de la migration :', err);
    return db.destroy();
  });

