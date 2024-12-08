db.createUser({
    user: "mongouser",
    pwd: "mongopassword",
    roles: [{ role: "readWrite", db: "mongodb" }]
  });