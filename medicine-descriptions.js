var fs = require('fs');
var _ = require('lodash');
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

let index = 0;
let success = 0;
console.log('Total URLs:', urls.length);
for (let i = 600; i < urls.length; i++) {
	const { url } = urls[i];
	setTimeout(makeRequest, index * 2000, url);
	index++;
}

// const rawHTMLFile = fs.readFileSync(
// 	'medicines-sample-html-content.txt',
// 	'utf8'
// );
// const htmlArray = rawHTMLFile.split(';;;;;;;;;;');
// htmlArray.forEach(html => getInfo(cheerio.load(html)));

if (medicines.length > 100) {
	fs.writeFileSync(
		'medicines-with-sku-and-description-final.json',
		JSON.stringify(medicines)
	);
}

function makeRequest(url) {
	//Make HTTP request to product URL
	console.log(url);
	var options = {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
			'Cache-Control': 'no-cache',
			cookie:
				'CACHED_FRONT_FORM_KEY=DknvLBY6WKagKzAr; frontend=660q7fp2ac6vua4bf6b7snnme4; frontend_cid=4F2P6uLFq2Vm0ph1; visid_incap_2194663=nYE5vN08S6iDvbGQ01uP6Gvryl4AAAAAQUIPAAAAAADgLvTYGBynZwDekeDz6QNp; incap_ses_1057_2194663=wHPaLq5MRVwioFhQ9DerDmvryl4AAAAAW4jMHvluI5/OEs1itHgb6A==; _ga=GA1.2.62365311.1590356846; _gid=GA1.2.704241259.1590356846; _gcl_au=1.1.452559511.1590356846; _hjid=729933c6-9278-41fd-9343-d7e6f73b06a1; _fbp=fb.1.1590356846157.1459255338; VIEWED_PRODUCT_IDS=1782; external_no_cache=1; __atuvc=2%7C22; __atuvs=5ecaebb59ee4b146001',
		},
		withCredentials: true,
	};
	axios
		.get(url, options)
		.then((response) => {
			if (response.status === 200) {
				const html = response.data;
				writeHtmlContentToFile(html);
				const $ = cheerio.load(html);
				getInfo($, url);
				console.log('Number of successful requests', success);
				success++;
			} else {
				console.log('ERROR making request');
			}
		})
		.catch((error) => console.log('ERROR making request', error.message));

	//Sample html for dev
	// const html = fs.readFileSync('medicines-sample-html-content.txt');
	// const $ = cheerio.load(html, url);
	// getInfo($);
}

function getInfo($, url) {
	let name = $('div.page-title').text().trim();

	let price = $('span.price').text().trim();

	let sku = $('#product-attribute-specs-table > tbody > tr:nth-child(2) > td')
		.text()
		.trim();

	let caracteristicas = $(
		'#product-attribute-specs-table > tbody > tr:nth-child(3) > td'
	)
		.text()
		.trim();

	let ingredientes = $(
		'#product-attribute-specs-table > tbody > tr:nth-child(4) > td'
	)
		.text()
		.trim();

	const description = $('#product_tabs_description_contents > div > div')
		.text()
		.trim();

	//Save to file
	let item = {
		name: name,
		price: price,
		sku: sku,
		caracteristicas: caracteristicas,
		ingredientes: ingredientes,
		description: description,
		url: url,
	};
	medicines.push(item);
	console.log('Number of medicines: ' + medicines.length);
	writeMedicinesFile(item);
}

function writeMedicinesFile(medicine) {
	if (!medicine) {
		console.log('item was empty');
	}

	fs.appendFile(
		'medicines-with-sku-and-description.json',
		JSON.stringify(medicine),
		(err) => {
			if (err) throw err;
		}
	);
}

function writeHtmlContentToFile(html) {
	fs.appendFile(
		'medicines-sample-html-content.txt',
		html.concat(';;;;;;;;;;'),
		(err) => {
			if (err) throw err;
		}
	);
}
