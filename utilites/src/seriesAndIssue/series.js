const csvToJson = require("convert-csv-to-json");
const data = csvToJson.fieldDelimiter(",").getJsonFromCsv("./inventory.csv");

data.forEach(item => {
  console.log(
    `INSERT INTO series (name, volume) VALUES ('${item.SERIES}','${item.VOLUME}');`
  );
  console.log(
    `INSERT INTO issue ("issueNumber", "seriesId", memo) VALUES ('${item.ISSUE}', (SELECT id FROM series WHERE name = '${item.SERIES}' AND volume = '${item.VOLUME}'), '');`
  );
});
