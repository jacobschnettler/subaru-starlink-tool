const puppeteer = require('puppeteer');

function openBrowser() {
	return puppeteer.launch({
		headless: false,
		// headless: process.env.devmode == 'true',
	});
}

module.exports = {
	openBrowser,
};
