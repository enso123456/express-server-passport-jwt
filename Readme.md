This source code is a scaffolding of a express-passport-module

##To run in development mode
* `npm run dev`

## Mongo Credentials
* `use admin`
* `switched to db admin`
* `db.createUser(
  {
    user: "root123",
    pwd: "abc123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)`
* `db.auth("root123", "abc123" )`

