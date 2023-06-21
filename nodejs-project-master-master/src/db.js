//Lipaz Mizrahi - 206505745
//Maya Sasson - 209222769
const mongoose = require("mongoose");
const { connect } = mongoose;

const db_url =
  "mongodb+srv://admin:admin@cluster0.14nr0wr.mongodb.net/" ||
  "mongodb://localhost/project";
connect(db_url)
  .then(console.log("Connected to DB successfully")) //Logging success message.
  .catch((err) => console.error(err)); // Logging error message
// db.on("error", (err) => {
//   console.error(err);
// });
//
// db.once("open", () => {
//   console.log("Connected to DB successfully");
// });

module.exports = mongoose;
