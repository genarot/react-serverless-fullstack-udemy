require("dotenv").config({});
const AirTable = require("airtable");

const API_KEY = process.env.AIRTABLE_API_KEY;

AirTable.configure({
  apiKey: API_KEY,
});

const base = AirTable.base(process.env.AIRTABLE_API_BASE);

const table = base.table(process.env.AIRTABLE_API_TABLE);

exports.handler = async (event) => {
  try {
    const records = await table.select().firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to query records in Airtable" }),
    };
  }
};
