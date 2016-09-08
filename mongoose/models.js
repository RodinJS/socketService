module.exports = function (db) {
    db.model('App', require("./schema/app"));

    const App = db.model('App');
    let x = new App();
    x.save((err) => {
        console.log(err);
    })
};