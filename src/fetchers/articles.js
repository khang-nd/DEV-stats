require("dotenv").config();
const { get } = require("../utils/fetch");
const MAX_ITEMS = 1000;

const tagsReducer = (list, article) => [...list, ...article.tag_list];

const viewCountReducer = (total, article) => total + article.page_views_count;

const reactionCountReducer = (total, article) =>
  total + article.public_reactions_count;

/** @return {Promise<Array>} */
async function getArticles(page) {
  const { data } = await get("/articles/me", {
    headers: { "api-key": process.env.API_KEY },
    params: { page, per_page: MAX_ITEMS },
  });
  return data;
}

module.exports = async () => {
  let page = 1;
  let articles = await getArticles(page++);
  let count = articles.length;
  while (count > 0 && count === MAX_ITEMS) {
    const nextArticles = await getArticles(page++);
    count = nextArticles.length;
    articles = [...articles, ...nextArticles];
  }

  const allTags = articles.reduce(tagsReducer, []);
  const uniTags = new Set(allTags);
  const postTendency = {};
  uniTags.forEach((uniTag) => {
    postTendency[uniTag] = allTags.filter((tag) => tag === uniTag).length;
  });

  return {
    total: articles.length,
    totalViews: articles.reduce(viewCountReducer, 0),
    totalReactions: articles.reduce(reactionCountReducer, 0),
    postTendency,
  };
};
