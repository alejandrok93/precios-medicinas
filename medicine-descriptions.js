var fs = require('fs');
// const request = require('request');
var cheerio = require('cheerio');
const axios = require('axios');
// const curl = new (require("curl-request"))();

//Define variables
let medicines = [];
let urlErrorCount = 0;

//Load URLS from file
let raw_urls = fs.readFileSync('medicine-urls.json');
let urls = JSON.parse(raw_urls);

// urls.forEach(item => makeRequest(item.url));
for (let i = 0; i < 1; i++) {
	const { url } = urls[i];
	console.log(url);
	makeRequest(url);
}

function makeRequest(url) {
	//Make HTTP request to product URL
	var options = {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
			'Cache-Control': 'no-cache',
			cookie:
				'LAST_CATEGORY=880; CATEGORY_INFO=%7B%22limit%22%3A%2256%3Fp%3D1%22%7D; visid_incap_2194663=VQTICNsTS0i+lKet7uRAxFEUyF4AAAAAQUIPAAAAAACedj9cTJ7WKWLIRb6XH6RD; nlbi_2194663=xUTbPUzfGEvgLC6IGayX4AAAAAAdB3KfROttwkAmRVMiqVz3; _gcl_au=1.1.1902052630.1590170712; _ga=GA1.2.301313865.1590170712; _hjid=971e49ec-30d5-4e60-b32d-0d07d8e9b3f8; CACHED_FRONT_FORM_KEY=6cqz4a8PBN1VqzHC; _gid=GA1.2.1669434573.1590288549; frontend=u8ol50s7ch3ste7g6a6kpiqeu3; incap_ses_1057_2194663=dv0rcwPUnjGh6FRQ9DerDk+yyl4AAAAAuhe3Z2RkobDioJHnlr3gRw==; external_no_cache=1; VIEWED_PRODUCT_IDS=625%2C626%2C9926; _hjAbsoluteSessionInProgress=1; frontend_cid=ALlFp4kVxMRFvH8D; __atuvc=2%7C21%2C4%7C22; __atuvs=5ecab251d1384ff2003; _gat_gtag_UA_43421096_11=1; _gat_UA-43421096-4=1'
		}
	};

	axios
		.get(url, options)
		.then(response => {
			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				getInfo($, url);
			} else {
				console.log('ERROR making request');
			}
		})
		.catch(error => console.log('ERROR making request', error.message));
}

function getInfo($, url) {
	let name = $('div.page-title')
		.text()
		.trim();

	let price = $('span.price')
		.text()
		.trim();
	let sku = $('tbody')
		.find('td')
		.first()
		.text()
		.trim();

	const description = $('div.std')
		.text()
		.trim();

	//Save to file
	let item = {
		name: name,
		price: price,
		sku: sku,
		description: description,
		url: url
	};
	console.log({ item });
	medicines.push(item);
	console.log('Number of medicines: ' + medicines.length);
	writeMedicinesFile(item);
}

function writeMedicinesFile(medicine) {
	if (!medicine) {
		console.log('item was empty');
	}

	fs.appendFile(
		'medicines-with-sku-description.txt',
		JSON.stringify(medicine),
		err => {
			if (err) throw err;
		}
	);
}
