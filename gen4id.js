const genRandomHexOrdersID = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

    for(let i  = 0; i < 20; i++){
  console.log(i+1 + "\t\t" +'o' + genRandomHexOrdersID(8));
}



// var datemilli = Date.parse('Sun May 11,2014');
// let todayDate = new Date().toISOString().slice(0, 10);
// console.log(todayDate);