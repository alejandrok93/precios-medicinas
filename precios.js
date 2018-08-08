// var express = require('express');
// var app     = express();
var fs = require("fs");
const request = require("request-promise");
var cheerio = require("cheerio");

//Define variables
var $;
var medicines = [];

//DEFINE URLS
urls = [
  "http://www.fahorro.com/medicamentos/analgesicos.html?limit=56",
  "http://www.fahorro.com/medicamentos/musculares-y-desinflamatorios.html",
  "http://www.fahorro.com/medicamentos/estomacales.html?limit=56",
  "http://www.fahorro.com/medicamentos/respiratorios-1.html",
  "http://www.fahorro.com/medicamentos/oftalmicos.html",
  "http://www.fahorro.com/medicamentos/dermatologicos.html",
  "http://www.fahorro.com/medicamentos/especialidades-medicas.html",
  "http://www.fahorro.com/medicamentos/farmahorro.html",
  "http://www.fahorro.com/medicamentos/diabetes.html",
  "http://www.fahorro.com/medicamentos/naturistas-y-herbolarios.html"
];

let url =
  "http://www.fahorro.com/medicamentos/musculares-y-desinflamatorios.html";
//make GET request to url

function makeRequest(url) {
  let options = {
    uri: url,
    transform: function(html) {
      return cheerio.load(html);
    },
    timeout: 250000
  };
  request(options)
    .then($ => {
      getMedicineInfo($);
    })
    .catch(err => {
      console.log(err);
    });
}

function getMedicineInfo($) {
  //loop through each li.item in the html
  console.log("im in the getmedicineinfo method");
  $("li.item").each(function(i, elem) {
    var n = 0;
    medicines.push({
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
  console.log(medicines);
  writeMedicinesFile(medicines);
}

//call makeRequest function for URLs
urls.forEach(item => {
  makeRequest(item);
});

fs.writeFile("medicine-prices-test.txt", "", function(err) {
  if (err) {
    console.log(err);
  }
});

function writeMedicinesFile(medicines) {
  fs.appendFile("medicine-prices-test.txt", JSON.stringify(medicines), err => {
    if (err) throw err;
    console.log("more data was added to file!");
  });
}
