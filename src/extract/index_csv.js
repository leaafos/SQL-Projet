const fs = require('fs');
const path = require('path');


/**
 * EXTRACT — Lit les données brutes depuis un fichier CSV
 */
function extract(filePath, options = {}) {
  console.log('📥 [EXTRACT] Lecture du fichier :', filePath);

  const { filter, fromLine = 1 } = options;

  const absolutePath = path.resolve(filePath);
  const ext = path.extname(absolutePath).toLowerCase();
  if (ext !== '.csv') {
    throw new Error('Format de fichier non supporté : ' + ext);
  }

  const { parse } = require('csv-parse');
  const fd = fs.openSync(absolutePath, 'r');
  const probeBuffer = Buffer.alloc(2048);
  const bytesRead = fs.readSync(fd, probeBuffer, 0, 2048, 0);
  fs.closeSync(fd);
  const firstLine = probeBuffer.toString('utf-8', 0, bytesRead).split(/\r?\n/)[0] || '';
  const delimiter = firstLine.includes(';') ? ';' : ',';

  const stream = fs.createReadStream(absolutePath);
  let allData = [];

  return new Promise((resolve, reject) => {
    stream
      .pipe(parse({ columns: true, skip_empty_lines: true, delimiter, bom: true, from_line: fromLine }))
      .on('data', (row) => {
        if (filter) {
          const match = Object.entries(filter).every(([col, val]) => row[col] === val);
          if (!match) return;
        }
        allData.push(row);
      })
      .on('end', () => {
        console.log(`   ➜ ${allData.length} lignes extraites (CSV)${filter ? ' [filtré]' : ''}`);
        resolve(allData);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = { extract };
