const passport = require("passport")
const Authenticate = require("./controllers/authentication")
const passportService = require("./services/passport")

// dont allow for session based
// requireAuth is the middleware for accessing some route
const requireAuth = passport.authenticate("jwt", {session: false})
const requireSignin = passport.authenticate("local", {session: false})

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send({ message: 'Advanced React Redux: Server - Client Auth Scaffolding'})
  })
  app.post("/signin", requireSignin, Authenticate.signin)
  app.post("/signup", Authenticate.signup)
}
