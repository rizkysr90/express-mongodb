const DB = require("./src/models/index");
const app = require("./server");
require("dotenv").config();
const port = process.env.PORT;

DB.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.listen(port, () => {
  console.log("Server is running");
});
