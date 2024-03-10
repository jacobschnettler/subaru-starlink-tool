const { waitForSpinner } = require('./waitForSpinner');

async function login(page) {
	await waitForSpinner(page);

	console.log('Typing in email & password');

	// Type in username and password
	await page.type('#username', process.env.email);
	await page.type('#password', process.env.password);

	console.log('Logging in...');

	const searchResultSelector = '.submitButton';
	await page.waitForSelector(searchResultSelector);
	await page.click(searchResultSelector);

	await waitForSpinner(page);

	const twoStepSelector = '#twoStepAuthenticationStep1';
	await page.waitForSelector(twoStepSelector);
	await page.click(twoStepSelector);

	await waitForSpinner(page);
}

module.exports = {
	login,
};
