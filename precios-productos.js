// var express = require('express');
// var app     = express();
var fs = require("fs");
const request = require("request");
var cheerio = require("cheerio");

//Define variables
var $;
var medicines = [];
var productURLS = [];

//DEFINE URLS
let totalItems = 1007 + 506 + 227 + 49 + 113 + 149 + 454 + 629 + 47 + 243;

function makeRequest(url) {
  request(url, function(error, response, body) {
    if (error) {
      console.log("There was an error in the HTTP GET request for URL: " + url);
      // console.log(error);
      return null;
    } else {
      getProductURL(cheerio.load(body));
      return cheerio.load(body);
    }

    // let $ = cheerio.load(body);
    // //getMedicineInfo($, url);
    // getProductURL($, url);
  });
}

function getProductURL($, url) {
  $("li.item").each(function(i, elem) {
    productURLS.push(
      $(this)
        .find(".product-name a")
        .attr("href")
    );
  });
  console.log(productURLS);
  console.log("number of URLS : " + productURLS.length);

  for (let i = 0; i < productURLS.length; i++) {
    getProductInfo(productURLS[i]);
  }
}

function getProductInfo(url) {
  //Make HTTP request to product URL
  console.log("medicine URL : " + url);
  let $ = request(url, function(error, response, body) {
    if (error) {
      console.log("There was an error in the HTTP GET request for URL: " + url);
      // console.log(error);
      return null;
    } else {
      console.log(cheerio.load(body));
      return cheerio.load(body);
    }
  });
  // console.log($("div.page-title"));
  // console.log(
  //   "Product Name " +
  //     $(".product-name")
  //       .text()
  //       .trim()
  // );
  console.log(" at URL : " + url);
}

function getMedicineInfo($, url) {
  //loop through each li.item in the html

  $("li.item").each(function(i, elem) {
    var n = 0;
    let item = {
      category: $("div.page-title")
        .text()
        .trim(),
      name: $(this)
        .find($(".product-name"))
        .text()
        .trim(),
      price: $(this)
        .find("span.price")
        .text()
        .trim()
    };

    writeMedicinesFile(item);

    medicines.push({
      category: $("div.page-title")
        .text()
        .trim(),
      name: $(this)
        .find($(".product-name"))
        .text()
        .trim(),
      price: $(this)
        .find("span.price")
        .text()
        .trim()
    });
  });
  console.log(
    "Total number of items at this time: " + medicines.length + " from " + url
  );
}

//call makeRequest function for URLs
// urls.forEach(item => {
//   makeRequest(item);
// });

let data = makeRequest("http://www.fahorro.com/medicamentos.html");
//let urls = getProductURL(data);

// for (let i = 0; i < urls.length; i++) {
//   getProductInfo(makeRequest(urls[i]), urls[i]);
// }

// for (let i = 0; i < urls.length; i++) {
//   makeRequest(urls[i]);
//   // console.log(result);
// }

fs.writeFile("medicine-prices-test.txt", "", function(err) {
  if (err) {
    console.log(err);
  }
});

function writeMedicinesFile(medicine) {
  if (!medicine) {
    console.log("item was empty");
  }

  fs.appendFile("medicine-prices-fa.txt", JSON.stringify(medicine), err => {
    if (err) throw err;
  });
}

if (medicines.length > 2000) {
  console.log(medicines);
}
