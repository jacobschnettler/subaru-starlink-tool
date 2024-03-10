const { fetchCode } = require('./fetchCode');

async function twoStep(page) {
	console.log('Fetching two-factor code...');

	setTimeout(async () => {
		const twoFactorCode = await fetchCode();

		await page.type('#verificationCode', twoFactorCode);

		await page.evaluate(() => {
			document.querySelector('#rememberDevice').parentElement.click();
		});
	}, 30000);
}

module.exports = {
	twoStep,
};
