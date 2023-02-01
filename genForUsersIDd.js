const genRandomHexUsersID = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

for (let i = 0; i < 8; i++) {
  console.log(i + 1 + "\t\t" + "u" + genRandomHexUsersID(8));
}
