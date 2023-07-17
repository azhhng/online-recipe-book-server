import logger from "../logger";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const fileName = "validateAccessToken.ts";

const getKey = async (kid: string): Promise<string> => {
  try {
    const client = jwksClient({
      cache: true, // Default Value
      cacheMaxEntries: 5, // Default value
      cacheMaxAge: 600000, // Defaults to 10m
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });
    const key = await client.getSigningKey(kid);
    const publicKey = key.getPublicKey();
    return publicKey;
  } catch (error) {
    logger(
      fileName,
      "getKey",
      `There was an error getting the public key.`,
      error
    );
    throw error;
  }
};

const validateAccessToken = async (tokenHeader: string): Promise<void> => {
  try {
    const token = tokenHeader.replace("Bearer ", "");
    console.log("TOKEN ===========");
    console.log(token);
    const decoded = jwt.decode(token, { complete: true });
    console.log("DECODED ===========");
    console.log(token);
    const kid = String(decoded?.header.kid);
    console.log("KID ===========");
    console.log(token);
    const publicKey = await getKey(kid);
    jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  } catch (error) {
    logger(
      fileName,
      "validateAccessToken",
      `There was an error validating the access token.`,
      error
    );
    throw error;
  }
};

export { validateAccessToken };
