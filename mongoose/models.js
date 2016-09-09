module.exports = function (db) {
    db.model('App', require("./schema/app.js"));
};