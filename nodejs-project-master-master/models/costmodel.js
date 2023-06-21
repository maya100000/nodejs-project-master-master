//Lipaz Mizrahi - 206505745
//Maya Sasson - 209222769
const mongoose = require("../src/db.js");
const { Schema, model } = mongoose;

let productId = 0;
const categoryArr = [
  "food",
  "health",
  "housing",
  "sport",
  "education",
  "transportation",
  "other",
];
const costSchema = Schema({
  id: Number,
  user_id: String,
  description: String,
  category: String,
  sum: Number,
  year: Number,
  month: Number,
  day: Number,
});

//Logging the document [was for tests]
costSchema.methods.printMe = function () {
  console.log(
    `ID: ${this.id}: userid: ${this.user_id} description: ${this.description}  category: ${this.category},sum: ${this.sum},
    year:${this.year},month:${this.month},day:${this.day}`
  );
};

//generates a new ID for incoming products.
costSchema.methods.setID = function () {
  return productId++;
};
//Method to check if the category input is in the category array.
costSchema.methods.isCategoryValid = function (item) {
  return categoryArr.includes(item);
};

costSchema.methods.getArray = () => categoryArr;

const Cost = model("cost", costSchema);

module.exports = Cost;
