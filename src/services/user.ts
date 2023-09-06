// handle auth0
const axios = require("axios").default;
import * as userQueries from "../postgresql/userQueries";
import logger from "../logger";

const fileName = "user.ts";

export const getToken = async () => {
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

export const deleteUser = async (userSub: string, userId: string) => {
  try {
    // remove from auth0
    const token = await getToken();
    var options = {
      method: "DELETE",
      url: `${process.env.AUTH0_API_ADDRESS}users/${userSub}`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    await axios(options);
    // remove from database
    const response = await userQueries.deleteUser(userId);
    return response;
  } catch (error) {
    logger(
      fileName,
      "deleteUser",
      `There was an error deleting the user ${userId} in Auth0.`,
      error
    );
    throw error;
  }
};

export const getUserAuth0 = async (userId: string, fields: string) => {
  const token = await getToken();
  var options = {
    method: "GET",
    url: `${process.env.AUTH0_API_ADDRESS}users/${userId}?fields=${fields}`,
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
      `There was an error getting the user ${userId} from Auth0.`,
      error
    );
    throw error;
  }
};
