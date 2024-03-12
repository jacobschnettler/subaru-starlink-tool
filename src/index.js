// Jacob Schnettler
// 3/9/2024
// Puppeteer tool to fetch Subaru Starlink data

require('dotenv').config();

const IMAP = require('./imap');

const axios = require('axios');

const {
	openBrowser,
	createPage,
	login,
	twoStep,
	fetchData,
} = require('./events');

async function transmitData() {
	try {
		console.log('Transmitting data...');

		const browser = await openBrowser();

		const page = await createPage(browser);

		await login(page);

		await twoStep(page);

		await page.waitForSelector('.body-content');

		const vehicleData = await fetchData(page);

		await browser.close();

		const response = await axios.post(
			process.env.API + '/subaru/update',
			vehicleData
		);

		if (response.data.message) console.log('Uploaded data to API.');
		else console.log('Error uploading data to API');
	} catch (err) {
		console.log(err);
	}
}

setInterval(transmitData, 600000);

transmitData();
