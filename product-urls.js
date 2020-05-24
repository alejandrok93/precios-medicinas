var fs = require("fs");
const request = require("request");
var cheerio = require("cheerio");

//define variables
let urls = [];

for (i = 1; i <= 81; i++) {
  let url = "http://www.fahorro.com/medicamentos.html?p=" + i;
  makeRequest(url);
}
// make HTTP request to get URLs for all products
function makeRequest(url) {
  let $ = request(url, function(error, response, body) {
    if (error) {
      console.log("There was an error in the HTTP GET request for URL: " + url);
      // console.log(error);
      return null;
    } else {
      getURLS(cheerio.load(body), url);
    }
  });
}

//get URLS from search result

function getURLS($, url) {
  $("li.item").each(function(i, elem) {
    item = {
      url: $(this)
        .find(".product-name a")
        .attr("href")
    };
    urls.push({
      url: $(this)
        .find(".product-name a")
        .attr("href")
    });

    //save product URLS to file
    writeMedicinesFile(item);
  });
  console.log(urls);
  console.log("numebr of product URLS : " + urls.length);
}
// save product URLS to file
function writeMedicinesFile(url) {
  if (!url) {
    console.log("item was empty");
  }

  fs.appendFile("medicine-urls.txt", JSON.stringify(url), err => {
    if (err) throw err;
  });
}
