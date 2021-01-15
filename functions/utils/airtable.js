if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({});
}
const AirTable = require("airtable");

const API_KEY = process.env.AIRTABLE_API_KEY;

AirTable.configure({
  apiKey: API_KEY,
});

const base = AirTable.base(process.env.AIRTABLE_API_BASE);

const table = base.table(process.env.AIRTABLE_API_TABLE);

const getHighScores = async (filterEmptyRecords) => {
  const queryOptions = { sort: [{ field: "score", direction: "desc" }] };
  if (filterEmptyRecords) {
    queryOptions.filterByFormula = 'AND(name != "", score > 0)';
  }

  const records = await table.select(queryOptions).firstPage();

  const formattedRecords = records.map((record) => ({
    id: record.id,
    fields: record.fields,
  }));

  return formattedRecords;
};

module.exports = {
  table,
  getHighScores,
};
