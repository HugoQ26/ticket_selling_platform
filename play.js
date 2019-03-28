const crypto = require("crypto");

const password = "Bardzo długie hasło";

//randomBytes returns a buffer so
console.time("start");

const salt = crypto.randomBytes(256).toString("hex");
//const salt = "dupa";
console.log(salt);

const hashedPwd = crypto
  .pbkdf2Sync(password, salt, 100000, 500, "sha512")
  .toString("hex");

const check = crypto
  .pbkdf2Sync(password, salt, 100000, 500, "sha512")
  .toString("hex");

console.log(hashedPwd === check);
console.timeEnd("start");
