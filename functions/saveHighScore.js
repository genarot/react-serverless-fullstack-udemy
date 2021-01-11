const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");
const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  console.log(getAccessTokenFromHeaders(event.headers));
  const token = getAccessTokenFromHeaders(event.headers);

  const user = await validateAccessToken(token);

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        err: "User is not authorizated",
      }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "That method   is not allowed" }),
    };
  }
  const name = user["https://learnbuildtype/username"];
  const { score } = JSON.parse(event.body);

  if (typeof score === "undefined" || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }

  try {
    const records = await getHighScores(false);

    console.log("records", records);
    const lowestRecord = records[9];

    if (
      typeof lowestRecord.fields.score === "undefined" ||
      score > lowestRecord.fields.score
    ) {
      // update this record with the incoming score
      const updatedRecord = {
        id: lowestRecord.id,
        fields: { name, score },
      };
      await table.update([updatedRecord]);
      return {
        statusCode: 201,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to insert records in Airtable" }),
    };
  }
};
