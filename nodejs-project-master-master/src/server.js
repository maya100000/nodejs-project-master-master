//Lipaz Mizrahi - 206505745
//Maya Sasson - 209222769
const express = require("express");
const { getReport, addCost, students, isInputValid } = require("./router");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/report", getReport);

app.post("/addcost", isInputValid, addCost);

//getting the json formatted student details
app.get("/about", (req, res) => {
  res.status(200).json(students);
});

//if no path from the above matches, go here:
app.all("*", (req, res) => {
  res.status(404).json({ message: "Unknown path" });
});
module.exports = app;
