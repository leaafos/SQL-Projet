/**
 * TRANSFORM — Nettoie, valide et formate les données avant insertion
 */
function transform(data) {
  console.log('\n🔄 [TRANSFORM] Transformation des données...');

  // Transformer les users : trim, lowercase email, hash basique du password
  const users = data.users.map((user) => ({
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: Buffer.from(user.password).toString('base64') // encodage basique (demo)
  }));

  // Créer un mapping email → index pour relier posts aux users
  const emailToIndex = {};
  users.forEach((user, index) => {
    emailToIndex[user.email] = index + 1; // les IDs commencent à 1
  });

  // Transformer les posts : trim, rattacher au user_id via l'email
  const posts = data.posts.map((post) => {
    const userEmail = post.user_email.trim().toLowerCase();
    return {
      title: post.title.trim(),
      content: post.content.trim(),
      user_id: emailToIndex[userEmail] || null
    };
  });

  console.log(`   ➜ ${users.length} users transformés`);
  console.log(`   ➜ ${posts.length} posts transformés`);

  return { users, posts };
}

module.exports = { transform };
