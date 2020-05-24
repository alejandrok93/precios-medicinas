var fs = require("fs");
const request = require("request");
//const axios = require("axios");
// const curl = new (require("curl-request"))();
var cheerio = require("cheerio");

//Define variables
let medicines = [];
let urlErrorCount = 0;

//Load URLS from file
let raw_urls = fs.readFileSync("medicine-urls.json");
let urls = JSON.parse(raw_urls);

urls.forEach(item => makeRequest(item.url));

function makeRequest(url) {
  //Make HTTP request to product URL

  var options = {
    method: "GET",
    url: url,
    host: "www.fahorro.com",
    timeout: 15000,
    forever: true,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
      "Cache-Control": "no-cache"
    }
  };

  let $ = request(options, function(error, response, body) {
    if (error) {
      console.log("There was an error in the HTTP GET request for URL: " + url);
      return null;
    } else {
      getInfo(cheerio.load(body));
    }
  });
}

function getInfo($) {
  let name = $("div.page-title")
    .text()
    .trim();

  let price = $("span.price")
    .text()
    .trim();
  let sku = $("tbody")
    .find("td")
    .first()
    .text()
    .trim();

  //Save to file
  let item = { name: name, price: price, sku: sku };
  //   console.log(item);
  medicines.push(item);
  console.log("Number of medicines: " + medicines.length);
  writeMedicinesFile(item);
}

function writeMedicinesFile(medicine) {
  if (!medicine) {
    console.log("item was empty");
  }

  fs.appendFile("medicines-with-sku.txt", JSON.stringify(medicine), err => {
    if (err) throw err;
  });
}
