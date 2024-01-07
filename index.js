const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const app = express();
const exphbs = require("express-handlebars"); // Change 'engine' to 'exphbs' for clarity
const views = path.join(__dirname, "views"); // Use 'path.join' for correct path joining
const members = require('./Members')


// TODO: MIDDLEWARE
// app.use(logger);
// app.use(express.static(path.join)) // Incomplete 'path.join', specify the directory.

// app.get("/", (req, res) => res.send("<h1>Hello World!!!</h1>"));
// Handlebars Middleware
app.engine("handlebars", exphbs.create({ defaultLayout: 'main' }).engine);

app.set("view engine", "handlebars");
app.set("views", views);

// Home page Router
app.get("/", (req, res) => 
  res.render("index",{
    title: 'Member App'
    ,members
  })
);

// app.use(express.static(path.join(__dirname, "public"))); // Assuming 'public' is your static folder.
// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
