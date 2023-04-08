const db = require("../models/index");
const { Op } = require("sequelize");

module.exports.followPostExpried = async () => {
  try {
    const postsExpried = await db.Post.findAll({
      where: {
        createdAt: {
          [Op.lte]: new Date(Date.now() - 60 * 60 * 24 * 1000 * 365),
        },
      },
      raw: true,
    });
    for (const post of postsExpried) {
      await db.Comment.update(
        { parentId: null },
        { where: { postId: post.id } }
      );

      const c = await db.Comment.destroy({
        where: {
          postId: post.id,
        },
      });
      const r = await db.Request.destroy({
        where: {
          postId: post.id,
        },
      });
      const p = await db.Post.destroy({
        where: {
          id: post.id,
        },
      });

      console.log("comments", c);
      console.log("request", r);
      console.log("post", p);
    }
  } catch (error) {
    console.log(error);
  }
};
