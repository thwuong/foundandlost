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
      const p = await db.Post.destroy({
        where: {
          id: post.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
