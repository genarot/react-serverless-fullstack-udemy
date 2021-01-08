const { getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  try {
    const records = await getHighScores(true);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(records),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to query records in Airtable" }),
    };
  }
};
