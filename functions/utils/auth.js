const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const { decode } = require("punycode");

const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.authorization;
  if (!rawAuthorization) {
    return null;
  }
  const authorizationParts = rawAuthorization.split(" ");
  if (authorizationParts[0] !== "Bearer" || authorizationParts.length !== 2) {
    return null;
  }

  return authorizationParts[1];
};

const jwksClient = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

let signingKey;

const validateAccessToken = async (token) => {
  if (!token) {
    return null;
  }
  try {
    if (!signingKey) {
      const key = await jwksClient.getSigningKeyAsync(process.env.AUTH0_KEY_ID);
      signingKey = key.getPublicKey();
    }
  } catch (err) {
    console.error(err);
    // throw Error("Failed to verify key");
    return null;
  }

  try {
    const decoded = jwt.verify(token, signingKey);
    console.log(decoded);
    return decoded;
  } catch (err) {
    console.error(err);
    // throw err;
    return null;
  }
};

module.exports = {
  getAccessTokenFromHeaders,
  validateAccessToken,
};
