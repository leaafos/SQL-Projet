
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');


/**
 * EXTRACT — Lit les données brutes depuis un fichier JSON ou CSV
 */
function extract(filePath) {
  console.log('📥 [EXTRACT] Lecture du fichier :', filePath);

  const absolutePath = path.resolve(filePath);
  const ext = path.extname(absolutePath).toLowerCase();
  if (ext !== '.csv') {
    throw new Error('Format de fichier non supporté : ' + ext);
  }

  // Utilisation d'un stream pour lire toutes les lignes
  const { parse } = require('csv-parse');
  const stream = fs.createReadStream(absolutePath);
  let allData = [];

  return new Promise((resolve, reject) => {
    stream
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => {
        allData.push(row);
      })
      .on('end', () => {
        console.log(`   ➜ ${allData.length} lignes extraites (CSV)`);
        resolve(allData);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = { extract };

if (require.main === module) {
  const csvFiles = [
    './data/Insee RP Hist 1968.csv',
    './data/Niveaux de prix TRVG.csv',
    './data/ORE-consommation-electrique-par-secteur-dactivite-commune_20251203_171113.csv'
  ];
  (async () => {
    for (const file of csvFiles) {
      try {
        const preview = await extract(file);
        console.log(preview);
      } catch (err) {
        console.error('Erreur lors de l\'extraction :', err.message);
      }
    }
  })();
}
