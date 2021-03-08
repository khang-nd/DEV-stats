const i18n = require("./i18n.json");
const Card = require("./utils/Card");
const Error = require("./utils/Error");
const { all } = require("./utils/fetch");
const getProfile = require("./fetchers/profile");
const getArticles = require("./fetchers/articles");
const getFollowers = require("./fetchers/followers");

module.exports = async (req, res) => {
  const { lang } = req.query;
  const message = i18n[lang] || i18n.en;
  res.header("Content-Type", "image/svg+xml");

  all([getProfile(), getArticles(), getFollowers()])
    .then(([profile, articleStats, followerCount]) => {
      const { name, profile_image } = profile;
      const { total, totalViews, totalReactions } = articleStats;
      res.send(
        new Card(name, { image: profile_image, ...req.query })
          .createRow(message.posts, total)
          .createRow(message.views, totalViews)
          .createRow(message.reactions, totalReactions)
          .createRow(message.followers, followerCount)
          .render()
      );
    })
    .catch((error) => {
      console.error(error);
      res.send(Error("Something went wrong!"));
    });
};
