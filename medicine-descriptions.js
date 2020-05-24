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

// if (medicines.length > 100) {
// 	fs.writeFileSync(
// 		'medicines-with-sku-and-description-final.json',
// 		JSON.stringify(medicines)
// 	);
// }

function makeRequest(url) {
	//Make HTTP request to product URL
	console.log(url);
	var options = {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
			'Cache-Control': 'no-cache',
			cookie:
				'CACHED_FRONT_FORM_KEY=agC1Gb4yidjVoGOb; VIEWED_PRODUCT_IDS=6084; frontend=595f32h4rf10e7kgiid4ufrfc2; frontend_cid=lWRORfEoHxci3gFo; visid_incap_2194663=7OG5Up0iQIuQ2VAPY6lUNuLjyl4AAAAAQUIPAAAAAADT/kgKHzJuUqWb5mF4riOE; incap_ses_1057_2194663=7M4aAuNpyArCNlhQ9DerDuLjyl4AAAAAQUyXrVVIHnzT77ESU4cDKQ==; external_no_cache=1; __atuvc=1%7C22; __atuvs=5ecae3e401efd73f000; _gcl_au=1.1.711215386.1590354917; _ga=GA1.2.2051195664.1590354917; _gid=GA1.2.511871333.1590354917; _gat_gtag_UA_43421096_11=1; _gat_UA-43421096-4=1; _hjid=c008cb8a-2a7d-4286-8c67-9e6429dd1484; _fbp=fb.1.1590354917604.1910570275; _hjAbsoluteSessionInProgress=1',
		},
	};
	axios
		.get(url, options)
		.then((response) => {
			if (response.status === 200) {
				const html = response.data;
				writeHtmlContentToFile(html);
				const $ = cheerio.load(html);
				getInfo($, url);
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
