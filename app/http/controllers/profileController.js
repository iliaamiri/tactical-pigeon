const database = include("databaseAccessLayer");

const Tokens = include("app/repos/Tokens");

const ProfileController = {
  async getUserData(req, res) {
    console.log('hello Phoenix!', req.cookies);
    const dbResponse = await database.getUserByEmail(req.cookies.email);
    console.log('userInfo', dbResponse[0][0]);
    const { email, username, games_played, games_won, games_lost } = dbResponse[0][0];
    res.json({
      email,
      username,
      games_played,
      games_won,
      games_lost
    });
  }
}

module.exports = ProfileController;