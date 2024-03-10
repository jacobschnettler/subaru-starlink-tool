// Jacob Schnettler
// 3/9/2024
// Puppeteer tool to fetch Subaru Starlink data

require('dotenv').config();

const IMAP = require('./imap');

const { openBrowser, createPage, login, twoStep } = require('./events');

(async () => {
	try {
		const browser = await openBrowser();

		const page = await createPage(browser);

		await login(page);

		await twoStep(page);

		const vehicleData = await fetchData(page);

		process.exit();
	} catch (err) {
		console.log(err);

		process.exit();
	}
})();
