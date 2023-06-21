//Lipaz Mizrahi - 206505745
//Maya Sasson - 209222769
const Cost = require("../models/costmodel");
const { isUser } = require("../models/usermodel");

//middleware to check if user's input valid and may proceed to creating cost.
const isInputValid = async (req, res, next) => {
  let { month, day, category, user_id, sum } = req.body; //destructing request
  //validating inputs
  if (
    !Cost.prototype.isCategoryValid(category) ||
    isValidDate(month, day) ||
    sum < 0
  ) {
    res.status(400).json({ message: "Wrong input!" });
    return;
  }
  //checks if there's a matching document for current input if not returns null
  if (!(await isUser(user_id))) {
    res.status(400).json({ message: "No such user id exists in database" });
    return;
  }

  next();
};

//check if the month/day params are valid
const isValidDate = (month, day) => {
  return month < 1 || month > 12 || day < 1 || day > 31;
};

async function createCost({
  id,
  user_id,
  description,
  category,
  sum,
  year,
  month,
  day,
}) {
  let json;
  const cost = new Cost({
    id: id,
    user_id: user_id,
    description: description,
    category: category,
    sum: sum,
    year: year,
    month: month,
    day: day,
  });
  json = await cost
    .save() //trying to save cost in DB.
    .catch((err) => console.error(err)); //logging error about saving the document in database.
  return json;
}

//creating cost after validating inputs.
const addCost = async (req, res) => {
  const json = await createCost({
    id: Cost.prototype.setID(),
    user_id: req.body.user_id,
    description: req.body.description,
    category: req.body.category,
    sum: req.body.sum,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
  });
  res.status(201).json(json);
};

//getting user report for certain month&year
const getReport = async (req, res) => {
  const { user_id: id, year, month } = req.query;
  if (month < 1 || month > 12 || year < 0) {
    res.status(400).json({ message: "Wrong input" });
  }
  try {
    const costs = await getAllCosts(id, year, month);
    const categories = Cost.prototype.getArray();
    const result = categories.reduce((acc, cat) => {
      let arr = [];
      costs.forEach((c) => {
        if (c.category === cat) {
          arr.push({
            day: c.day,
            description: c.description,
            sum: c.sum,
          });
        }
      });
      acc[cat] = arr;
      return acc;
    }, {});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getting all costs that matches params.
function getAllCosts(user_id, year, month) {
  return Cost.find({ user_id: user_id, year: year, month: month });
}

const students = [
  {
    firstname: "Lipaz",
    lastname: "Mizrahi",
    id: "206505745",
    email: "Lipazmizrahi1009@gmail.com",
  },
  {
    firstname: "Maya",
    lastname: "Sasson",
    id: "209222769",
    email: "Mayasasson11@gmail.com",
  },
];

module.exports = { addCost, getReport, students, isInputValid };
