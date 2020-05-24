var fs = require('fs');
const axios = require('axios');
var cheerio = require('cheerio');

// Start here
const productUrls = JSON.parse(fs.readFileSync('medicine-urls.json', 'utf8'));
scrapeMedicineDescriptions(productUrls);

async function scrapeMedicineDescriptions(productUrls) {
	try {
		for (let i = 0; i < 1; i++) {
			const { url } = productUrls[i];
			console.log(url);
			const respnse = await getHtmlContent(url);
			console.log({ response });
			const $ = cheerio.load(response.body);
			console.log({ $ });
			const productInfo = getProductInfo($, url);
		}
	} catch (error) {
		console.log('ERROR SCRAPING MEDICINE DESCRIPTIONS!!!');
		console.log(error);
	}
}

function getProductInfo($, url) {
	// console.log('get product info');
	// const productDescription = $('.std').text();
	// console.log({ productDescription });
	$('a').each((i, link) => {
		console.log('que pasaaa');
		const href = link.attribs.href;
		console.log(href);
	});
}

async function getHtmlContent(url) {
	try {
		const response = axios
			.get(url)
			.then(response => console.log(response))
			.catch(error => console.log(error));
		return response;
	} catch (error) {
		console.log('ERROR fetching for URL', url);
	}
}
