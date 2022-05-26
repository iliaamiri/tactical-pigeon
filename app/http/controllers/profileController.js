const database = include("databaseAccessLayer");

const Tokens = include("app/repos/Tokens");

const ProfileController = {
  async getUserData(req, res) {
    console.log(req.body)
  }
}

module.exports = ProfileController;