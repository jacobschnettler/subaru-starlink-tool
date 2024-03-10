const { waitForSpinner } = require('./waitForSpinner');

async function login(page) {
	await waitForSpinner(page);

	console.log('Typing in email & password');

	// Type in username and password
	await page.type('#username', process.env.email);
	await page.type('#password', process.env.password);

	console.log('Logging in...');

	const submitBTN = '.submitButton';

	await page.waitForSelector(submitBTN);
	await page.click(submitBTN);

	await waitForSpinner(page);

	const twoStepBTN = '#twoStepAuthenticationStep1';

	await page.waitForSelector(twoStepBTN);
	await page.click(twoStepBTN);

	await waitForSpinner(page);
}

module.exports = {
	login,
};
