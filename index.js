//import express, axios, path, router
const express = require("express");
const axios = require("axios");
const path = require("path");
const router = express.Router();
//instance express to the variable app
const app = express();

//all body requests are converted into JSON
app.use(express.json());

//import the flickr API URL into the function of getPhotos and sending page with it for changing the page in index.html, returning the response as "data"
async function getPhotos(page) {
  let res = await axios.get(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1364e21895ca3111b37ab2f418f9580a&tags=snowy+forest&per_page=10&page=" +
      page +
      "&format=json&nojsoncallback=1"
  );
  return res.data;
}

//return data with page when the browser requests localhost:3000/data
app.get("/data", async function (req, res) {
  let page = req.query.page;
  res.json(await getPhotos(page));
});
//requests access to root browser
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
  res.header("Access-Control-Allow-Origin", "*");
});
//routes path to index.html for GET and POST requests
//uses router (middleware) between root of client to server
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname will resolve to project folder.
  res.header("Access-Control-Allow-Origin", "*");
});
app.use("/", router);

//where the server is
app.listen(3000, () => console.log("Server listening at port 3000"));
