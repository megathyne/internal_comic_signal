const csvToJson = require("convert-csv-to-json");

const data = csvToJson.fieldDelimiter(",").getJsonFromCsv("./condition.csv");

console.log(
  `INSERT INTO condition (numerical, abbreviation, name, code) VALUES`
);
const mapped = data.map((item, i) => {
  if (i < data.length - 1)
    return `('${item.numerical.trim()}','${item.abbreviation.trim()}','${item.name.trim()}', '${item.code.trim()}'),`;
  else
    return `('${item.numerical.trim()}','${item.abbreviation.trim()}','${item.name.trim()}', '${item.code.trim()}');`;
});
mapped.forEach(item => console.log(item));
