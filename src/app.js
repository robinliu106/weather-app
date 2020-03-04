const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Robin Liu"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Robin Liu"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is the help message",
    name: "Robin Liu"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: req.query
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Page Not Found",
    message: "page not found message",
    name: "Unknown user"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    message: "page not found message",
    name: "Unknown user"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
