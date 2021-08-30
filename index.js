// Importing express
const express = require("express");
require("dotenv").config();
// Creating new express app
const app = express();

// PORT configuration
const PORT = process.env.PORT || 2020;

// app.use("/", (req, res, next) => {
//   console.log(`request type: ${req.method}
//                 time:${Date.now()},
//                 response:${res.body}
//   `);
//   next();
// });
// Create a route for the app

const UssdMenu = require("ussd-menu-builder");
let menu = new UssdMenu();

// Define menu states
menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con("Welcome. Choose option:" + "\n1. Show Balance");
  },
  // next object links to next state based on user input
  next: {
    1: "bye",
  },
});

menu.state("bye", {
  run: () => {
    menu.end(`bye kitu inawork ${menu.args.phoneNumber}`);
  },
});

app.post("/ussd", (req, res) => {
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text,
  };
  menu.run(args, (resMsg) => {
    res.send(resMsg);
  });
});

app.get("/", (req, res) => {
  res.send("stuff is working");
});

// Server listening to requests
app.listen(PORT, () => {
  console.log(`The Server is running at: 
          http://localhost:${PORT}/`);
});
