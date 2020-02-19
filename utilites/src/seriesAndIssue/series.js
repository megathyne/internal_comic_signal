const csvToJson = require("convert-csv-to-json");
const data = csvToJson.fieldDelimiter(",").getJsonFromCsv("./inventory.csv");

let hash = {};

data.forEach(item => {
  if (!hash[item.SERIES + item.VOLUME]) {
    console.log(
      `INSERT INTO series (name, volume) VALUES ('${item.SERIES}','${item.VOLUME}');`
    );
    hash[item.SERIES + item.VOLUME] = 1;
  }
  console.log(
    `INSERT INTO issue ("issueNumber", "seriesId", memo) VALUES ('${item.ISSUE}', (SELECT id FROM series WHERE name = '${item.SERIES}' AND volume = '${item.VOLUME}'), '');`
  );
});
