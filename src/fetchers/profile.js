require("dotenv").config();
const { get } = require("../utils/fetch");

module.exports = async () => {
  const { data } = await get("/users/me", {
    headers: { "api-key": process.env.API_KEY },
  });
  return data;
};
