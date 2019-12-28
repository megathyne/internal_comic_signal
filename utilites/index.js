let csvToJson = require("convert-csv-to-json");

let data = csvToJson.fieldDelimiter(",").getJsonFromCsv("./inventory.csv");
console.log(data.length);
// for (let i = 0; i < json.length; i++) {
//   console.log(json[i]);
// }

const mapped = data.map(
  item =>
    `INSERT INTO comic (series, volume, issue) VALUES ('${item.SERIES}','${item.VOLUME}','${item.ISSUE}');`
);

mapped.forEach(item => console.log(item))