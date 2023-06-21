//Lipaz Mizrahi - 206505745
//Maya Sasson - 209222769
const app = require("./server");

app.listen(process.env.PORT || 3000, "localhost", () => {
  console.log(`Server up and running at ${process.env.PORT || 3000}`);
});

module.exports = app;
