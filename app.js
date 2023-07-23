const express = require("express");
const bodyParser = require("body-parser");

//Storing todo list items in an array
const items = ["buy groceries", "cook food", "need to make sabji"];

//Storing todo list items in an array(WorkList)
const workItems = [];
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//Function to return today's date
function dateReturn() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate;
}

//GET METHOD
app.get("/", function (req, res) {
    const day = dateReturn();
    res.render("list", {
        kindofDay: day,
        newListItems: items,
    });
});

//POST METHOD
app.post("/", function (request, response) {
    const item = request.body.newitem;

    if (request.body.button === "Work List") {
        workItems.push(item);
        response.redirect("/work");
    } else {
        items.push(item);
        response.redirect("/");
    }
    console.log(request.body);
});

//work route

app.get("/work", function (req, res) {
    res.render("list", {
        kindofDay: "Work List",
        newListItems: workItems
    });
});

app.post("/work", function (req, res) {
    const item = req.body.newListItems;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("server is listening on 3000");
});