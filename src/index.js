// Jacob Schnettler
// 3/9/2024
// Puppeteer tool to fetch Subaru Starlink data

require('dotenv').config();

const { openBrowser, createPage, login, twoStep } = require('./events');

(async () => {
	const browser = await openBrowser();

	const page = await createPage(browser);

	await login(page);

	await twoStep(page);

	// console.log('closed');

	// process.exit();
})();
