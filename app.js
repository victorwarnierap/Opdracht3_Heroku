"use strict";
// Express toevoegen aan Node.js
const express = require("express");
const app = express();

// Importing the file system module
const fs = require("fs");

// bibliotheek inladen om paden naar folder te maken
const path = require("path");

// applicatiepoort instellen
const port = 5000;

app.use(express.static("public"));

// EJS configureren
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Getting the directory path in which the app.js resides
const mainPath = path.dirname(process.mainModule.filename);

// route naar "homepagina" laten werken
app.get("/", function(req, res) {
  const rawData = fs.readFileSync(path.join(mainPath, "data", "blog.json"));
  const blogData = JSON.parse(rawData);
  res.render("home", {
    blog: blogData.images
  });
});

// detailpagina van een blogbericht
//app.get('/blog/:postid', function(req,res){
//res.render('detail', {
//  post: blogposts.blog[req.params.postid]
//});
//});

//app.get("/portfolio", function(request, response){
//  console.log("portfolio");
//  response.render("portfolio", {
//    posts: blogposts.blog
//  })
//});

//app.get("/blog/:portfolioid", function(request, response){
//  response.send("portfoliobericht nr: "+request.params.portfolioid);
//});

app.get("/portfolio", function(req, res) {
  const rawData = fs.readFileSync(path.join(mainPath, "data", "blog.json"));
  const blogData = JSON.parse(rawData);
  res.render("portfolio", {
    blog: blogData.images
  });
});

app.get("/bericht", function(req, res) {
  const rawData = fs.readFileSync(path.join(mainPath, "data", "blog.json"));
  const blogData = JSON.parse(rawData);
  res.render("bericht", {
    blog: blogData.images
  });
});



app.get("/contact", function(request, response) {
  response.render("contact");
});


// heroku poort
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
