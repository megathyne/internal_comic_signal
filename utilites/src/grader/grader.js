const csvToJson = require("convert-csv-to-json");
const data = csvToJson.fieldDelimiter(",").getJsonFromCsv("./grader.csv");

console.log(`INSERT INTO grader (code, name) VALUES`);
const mapped = data.map((item, i) => {
  if (i < data.length - 1)
    return `('${item.code.trim()}','${item.name.trim()}'),`;
  else return `('${item.code.trim()}','${item.name.trim()}');`;
});
mapped.forEach(item => console.log(item));
