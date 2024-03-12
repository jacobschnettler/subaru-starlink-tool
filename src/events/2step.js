const { fetchCode } = require('./fetchCode');

async function twoStep(page) {
	return new Promise((resolve, reject) => {
		console.log('Fetching two-factor code...');

		setTimeout(async () => {
			const twoFactorCode = await fetchCode();

			console.log('Found two-factor code: ' + twoFactorCode);

			await page.type('#verificationCode', twoFactorCode);

			await page.evaluate(() => {
				document.querySelector('#rememberDevice').parentElement.click();
			});

			const submitBTN = '#twoStepAuthenticationStep2';

			await page.waitForSelector(submitBTN);
			await page.click(submitBTN);

			resolve();
		}, 30000);
	});
}

module.exports = {
	twoStep,
};
