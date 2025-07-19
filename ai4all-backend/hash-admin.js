// hash-admin.js
const bcrypt = require("bcrypt");
const password = "adminpass"; // Replace this

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log("Paste this hash into your DB:\n", hash);
});