// var express = require('express');
// var app     = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

//Define variables
var $;
var medicines = [];

//Get Date
var today = new Date();
var date =
	today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//DEFINE URLS

//importante: output category
// split name by space delimiter
urls = [
	'http://www.fahorro.com/medicamentos/analgesicos.html?limit=56?p=1',
	'http://www.fahorro.com/medicamentos/analgesicos.html?limit=56?p=2',
	'http://www.fahorro.com/medicamentos/analgesicos.html?limit=56?p=3',
	'http://www.fahorro.com/medicamentos/analgesicos.html?limit=56?p=4',
	'http://www.fahorro.com/medicamentos/analgesicos.html?limit=56?p=5',
	'http://www.fahorro.com/medicamentos/musculares-y-desinflamatorios.html',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=1',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=2',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=3',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=4',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=5',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=6',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=7',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=8',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=9',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=10',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=11',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=12',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=13',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=14',
	'http://www.fahorro.com/medicamentos/estomacales.html?limit=56?p=15',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=1',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=2',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=3',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=4',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=5',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=6',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=7',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=8',
	'http://www.fahorro.com/medicamentos/respiratorios-1.html?limit=56?p=9',
	'http://www.fahorro.com/medicamentos/oftalmicos.html?limit=56&p=1',
	'http://www.fahorro.com/medicamentos/oftalmicos.html?limit=56&p=2',
	'http://www.fahorro.com/medicamentos/oftalmicos.html?limit=56&p=3',
	'http://www.fahorro.com/medicamentos/dermatologicos.html?p=1',
	'http://www.fahorro.com/medicamentos/dermatologicos.html?p=2',
	'http://www.fahorro.com/medicamentos/dermatologicos.html?p=3',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=1',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=2',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=3',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=4',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=5',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=6',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=7',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=8',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=9',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=10',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=11',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=12',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=13',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=14',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=15',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=16',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=17',
	'http://www.fahorro.com/medicamentos/especialidades-medicas.html?p=18',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=1',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=2',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=3',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=4',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=5',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=6',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=7',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=8',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=9',
	'http://www.fahorro.com/medicamentos/farmahorro.html?p=10',
	'http://www.fahorro.com/medicamentos/naturistas-y-herbolarios.html',
	'http://www.fahorro.com/medicamentos/diabetes.html?p=1',
	'http://www.fahorro.com/medicamentos/diabetes.html?p=2',
	'http://www.fahorro.com/medicamentos/diabetes.html?p=3',
	'http://www.fahorro.com/medicamentos/diabetes.html?p=4',
	'http://www.fahorro.com/medicamentos/diabetes.html?p=5'
];

//Data:

let totalItems = 1007 + 506 + 227 + 49 + 113 + 149 + 454 + 629 + 47 + 243;
// "http://www.fahorro.com/medicamentos/musculares-y-desinflamatorios.html",
// "http://www.fahorro.com/medicamentos/estomacales.html?limit=56",
// "http://www.fahorro.com/medicamentos/respiratorios-1.html",
// "http://www.fahorro.com/medicamentos/oftalmicos.html",
// "http://www.fahorro.com/medicamentos/dermatologicos.html",
// "http://www.fahorro.com/medicamentos/especialidades-medicas.html",
// "http://www.fahorro.com/medicamentos/farmahorro.html",
// "http://www.fahorro.com/medicamentos/diabetes.html",
// "http://www.fahorro.com/medicamentos/naturistas-y-herbolarios.html"

// let url =
//   "http://www.fahorro.com/medicamentos/musculares-y-desinflamatorios.html";
//make GET request to url

function makeRequest(url) {
	request(url, function(error, response, body) {
		if (error) {
			console.log('There was an error in the HTTP GET request for URL: ' + url);
			// console.log(error);
			return null;
		}

		let $ = cheerio.load(body);
		getMedicineInfo($, url);
	});
}

function getMedicineInfo($, url) {
	//loop through each li.item in the html

	$('li.item').each(function(i, elem) {
		var n = 0;
		let item = {
			category: $('div.page-title')
				.text()
				.trim(),
			name: $(this)
				.find($('.product-name'))
				.text()
				.trim(),
			price: $(this)
				.find('span.price')
				.text()
				.trim()
		};

		writeMedicinesFile(item);

		medicines.push({
			category: $('div.page-title')
				.text()
				.trim(),
			name: $(this)
				.find($('.product-name'))
				.text()
				.trim(),
			price: $(this)
				.find('span.price')
				.text()
				.trim()
		});
	});
	console.log(
		'Total number of items at this time: ' + medicines.length + ' from ' + url
	);
}

//call makeRequest function for URLs
// urls.forEach(item => {
//   makeRequest(item);
// });

for (let i = 0; i < urls.length; i++) {
	makeRequest(urls[i]);
	// console.log(result);
}

fs.writeFile('medicine-prices-test.txt', '', function(err) {
	if (err) {
		console.log(err);
	}
});

function writeMedicinesFile(medicine) {
	if (!medicine) {
		console.log('item was empty');
	}

	fs.appendFile(
		`medicine-prices-fa-${date}.txt`,
		JSON.stringify(medicine),
		err => {
			if (err) throw err;
		}
	);
}

if (medicines.length > 2000) {
	console.log(medicines);
}
