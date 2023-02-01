const genRandomHexOrdersID = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

    for(let i  = 0; i < 20; i++){
  console.log(i+1 + "\t\t" +'o' + genRandomHexOrdersID(8));
}
