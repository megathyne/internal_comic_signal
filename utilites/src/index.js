const csvToJson = require("convert-csv-to-json");
const seriesissuesData = csvToJson
  .fieldDelimiter(",")
  .getJsonFromCsv("./seriesissues.csv");

// ===================== SERIES AND ISSUE =====================

let hash = {};

seriesissuesData.forEach(item => {
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

// ===================== CONDITION =====================

const conditionData = csvToJson
  .fieldDelimiter(",")
  .getJsonFromCsv("./condition.csv");

console.log(
  `INSERT INTO condition (numerical, abbreviation, name, code) VALUES`
);
const conditionDataMapped = conditionData.map((item, i) => {
  if (i < conditionData.length - 1)
    return `('${item.numerical.trim()}','${item.abbreviation.trim()}','${item.name.trim()}', '${item.code.trim()}'),`;
  else
    return `('${item.numerical.trim()}','${item.abbreviation.trim()}','${item.name.trim()}', '${item.code.trim()}');`;
});
conditionDataMapped.forEach(item => console.log(item));

// ===================== GRADER =====================

const graderData = csvToJson.fieldDelimiter(",").getJsonFromCsv("./grader.csv");

console.log(`INSERT INTO grader (code, name) VALUES`);
const graderDataMapped = graderData.map((item, i) => {
  if (i < graderData.length - 1)
    return `('${item.code.trim()}','${item.name.trim()}'),`;
  else return `('${item.code.trim()}','${item.name.trim()}');`;
});
graderDataMapped.forEach(item => console.log(item));

// ===================== PAGE =====================
const pageData = csvToJson.fieldDelimiter(",").getJsonFromCsv("./page.csv");

console.log(`INSERT INTO page (code, name) VALUES`);
const pageDataMapped = pageData.map((item, i) => {
  if (i < pageData.length - 1)
    return `('${item.code.trim()}','${item.name.trim()}'),`;
  else return `('${item.code.trim()}','${item.name.trim()}');`;
});
pageDataMapped.forEach(item => console.log(item));
