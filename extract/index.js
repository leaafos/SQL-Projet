const fs = require('fs');
const path = require('path');

/**
 * EXTRACT — Lit les données brutes depuis le fichier JSON source
 */
function extract(filePath) {
  console.log('📥 [EXTRACT] Lecture du fichier :', filePath);

  const absolutePath = path.resolve(filePath);
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  const data = JSON.parse(raw);

  console.log(`   ➜ ${data.users.length} users extraits`);
  console.log(`   ➜ ${data.posts.length} posts extraits`);

  return data;
}

module.exports = { extract };
