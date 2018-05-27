const users = require("../controllers/users");
const session = require("../controllers/session");
module.exports = app => {
    app.get("/api/users", users.index);
    app.get("/api/users/:userId", users.show);
    app.post("/api/users", users.create);
    app.put("/api/users/:userId", users.update);
    app.delete("/api/users/:userId", users.destroy);

    app.post("/api/login", session.create);
}