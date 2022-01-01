require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const bookRouter = require("../Routes/books");

let bodyparser = require('body-parser');
let urlencodedparser = bodyparser.urlencoded({extended:false})

app.use( urlencodedparser)

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept"
  );
  next();
});

//Define path for Express config
let publicDirectoryPath = path.join(__dirname, "../public");
let viewsPath = path.join(__dirname, "../templates/views");
let partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars Engine and Views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//SetUp Static Directory To Serve
app.use(express.static(publicDirectoryPath));

//Routes
app.use("/api", bookRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});

//For Checking Puroses...
app.get("/", (req, res) => {
  res.render("index", {
    pageName: "index",
  });
});
