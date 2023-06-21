//Lipaz Mizrahi - 206505745
//Maya Sasson - 209222769

const mongoose = require("../src/db.js");

const userSchema = mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  birthday: Date,
});
//Logging the document [was for tests]

userSchema.methods.printMe = function () {
  console.log(
    `User ${this.id}: firstname: ${this.first_name} lastname: ${this.last_name}  birthday: ${this.birthday}`
  );
};

const isUser = async (user_id) => {
  let user = await User.findOne({ id: user_id }); //converting user_id to number with +.
  console.log(user);
  return user;
};
const User = mongoose.model("user", userSchema);

module.exports = { User, isUser };
