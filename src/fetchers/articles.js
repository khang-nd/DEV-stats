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
  const uniqueTags = Array.from(new Set(allTags));
  const occurences = uniqueTags
    .map((tag) => [tag, allTags.filter((_tag) => _tag === tag).length])
    .sort((a, b) => b[1] - a[1]);
  const [a, b, c, d, ...e] = occurences;

  return {
    total: articles.length,
    totalViews: articles.reduce(viewCountReducer, 0),
    totalReactions: articles.reduce(reactionCountReducer, 0),
    postTendency: {
      [a[0]]: a[1],
      [b[0]]: b[1],
      [c[0]]: c[1],
      [d[0]]: d[1],
      Others: e.reduce((total, next) => total + next[1], 0),
    },
  };
};
