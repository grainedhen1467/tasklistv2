const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;
const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-us", options);
    res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {

    var item = req.body.newItem;

    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res) {
    res.render('list', {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res) {
    res.render('about');
});


app.listen(port, function() {
    console.log("App is ready on port 3000");
});
