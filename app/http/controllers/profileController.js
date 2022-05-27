const database = include("databaseAccessLayer");

const Tokens = include("app/repos/Tokens");

const ProfileController = {
  async getUserData(req, res) {
    console.log(req.user)

    res.json({
      email: req.user.email,
      username: req.user.username,
      games_played: req.user.gamesPlayed,
      games_won: req.user.gamesWon,
      games_lost: req.user.gamesLost
    });
  }
}

module.exports = ProfileController;