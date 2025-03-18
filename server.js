const express = require("express");
const mongodb = require("./data/database");
const homeRoute = require("./routes/index");
const bodyParser = require('body-parser');
const contactRoutes = require("./routes/contact");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X Requested-With, Content-Type', 'Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use("/contacts", contactRoutes); 
app.use("/", homeRoute);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is running and node is Listening on ${port}`);
    });
  }
});
