const express = require("express");
const mongoose = require("mongoose");
const employeeroutes = require("./routes/employeeroute");
const departmentsroutes = require("./routes/departmentroute");
const stateroutes = require("./routes/stateroute");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", employeeroutes);
app.use("/", departmentsroutes);
app.use("/", stateroutes);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/emp");
}
app.listen(9002, () => {
  console.log("server is running");
});
main().catch((err) => console.log(err));
