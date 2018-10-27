const yadicer = require("yadicer");
const RollMessage = require("./RollMessage");

class RollManager {
  static async roll(nomination, author){
    try {
      const roll = await yadicer(nomination);
      return new RollMessage({
        authorName: author.name,
        authorAvatar: author.avatar,
        authorColor: author.color,
        total: roll.total,
        rolls: roll.rolls
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new RollManager();