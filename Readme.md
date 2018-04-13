Run server api
`npm run dev`

Create to admin in mongo and make create connection
> `use admin`
>`switched to db admin`
>`db.createUser(
  {
    user: "root123",
    pwd: "abc123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)`
> `db.auth("root123", "abc123" )`

