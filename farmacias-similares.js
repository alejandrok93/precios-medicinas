var fs = require("fs");
const request = require("request");
var cheerio = require("cheerio");

// URL :https://www.farmaciasdesimilares.com/#!/medicamentos

let url = "https://www.farmaciasdesimilares.com/#!/medicamentos";

function makeRequest(url) {
  request(url, function(error, response, body) {
    if (error) {
      console.log("There was an error in the HTTP GET request for URL: " + url);

      return null;
    } else {
      getMedicineInfo(cheerio.load(body));
    }
  });
}

makeRequest(url);

function getMedicineInfo($) {}
