// handle auth0
const axios = require("axios").default;
const queries = require("../postgresql/queries");
const ManagementClient = require("auth0").ManagementClient;

const getManagementClient = async () => {
  var authOptions = {
    method: "POST",
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_API_CLIENT_ID ?? "",
      client_secret: process.env.AUTH0_API_CLIENT_SECRET ?? "",
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    }),
  };

  const response = await axios.request(authOptions);
  const token = response.data.access_token;
  return new ManagementClient({
    token,
    domain: process.env.AUTH0_DOMAIN,
  });
};

const deleteUser = async (user_id: string) => {
  // remove from auth0
  const auth0 = await getManagementClient();
  await auth0.deleteUser({ id: user_id });
  // remove from database
  const response = await queries.deleteUser(user_id);
  return response;
};

module.exports = {
  deleteUser,
};
