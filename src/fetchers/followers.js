require("dotenv").config();
const { get } = require("../utils/fetch");
const MAX_ITEMS = 1000;

async function getFollowers(page) {
  const { data } = await get("/followers/users", {
    headers: { "api-key": process.env.API_KEY },
    params: { page, per_page: MAX_ITEMS },
  });
  return data.length;
}

module.exports = async () => {
  let page = 1;
  let count = await getFollowers(page++);
  let total = count;
  while (count > 0 && count === MAX_ITEMS) {
    total += count;
    count = await getFollowers(page++);
  }
  return total;
};
