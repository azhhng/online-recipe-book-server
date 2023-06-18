// handle auth0
const axios = require("axios").default;
const queries = require("../postgresql/queries");
import { logger } from "../logger";

const fileName = "user.ts";

const getToken = async () => {
  var authOptions = {
    method: "POST",
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_API_CLIENT_ID ?? "",
      client_secret: process.env.AUTH0_API_CLIENT_SECRET ?? "",
      audience: process.env.AUTH0_API_ADDRESS ?? "",
    },
  };
  try {
    const response = await axios.request(authOptions);
    return response.data.access_token;
  } catch (error) {
    logger(
      fileName,
      "getToken",
      "There was an error getting the Auth0 token.",
      error
    );
    throw error;
  }
};

const deleteUser = async (user_id: string) => {
  try {
    // remove from auth0
    const token = await getToken();
    var options = {
      method: "DELETE",
      url: `${process.env.AUTH0_API_ADDRESS}users/${user_id}`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    await axios(options);
    // remove from database
    const response = await queries.deleteUser(user_id);
    return response;
  } catch (error) {
    logger(
      fileName,
      "deleteUser",
      `There was an error deleting the user ${user_id} in Auth0.`,
      error
    );
    throw error;
  }
};

const getUserAuth0 = async (user_id: string, fields: string) => {
  const token = await getToken();
  var options = {
    method: "GET",
    url: `${process.env.AUTH0_API_ADDRESS}users/${user_id}?fields=${fields}`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = (await axios(options)).data;
    return response;
  } catch (error) {
    logger(
      fileName,
      "getUserAuth0",
      `There was an error getting the user ${user_id} from Auth0.`,
      error
    );
    throw error;
  }
};

module.exports = {
  deleteUser,
  getUserAuth0,
};
