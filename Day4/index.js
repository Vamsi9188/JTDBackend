const fs = require('fs')
console.log("1")

// const data = fs.readFileSync("example.txt","utf-8")
// console.log(data)   // it displaying in middle
fs.readFile("example.txt","utf-8",(err, data) =>{
    console.log(data)   // 1,2,Hello, Vamsi! How are You?
})

console.log("2")
