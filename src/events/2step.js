const { fetchCode } = require('./fetchCode');

async function twoStep(page) {
	console.log('Fetching two-factor code...');

	const twoFactorCode = await fetchCode();

	await page.type('#verificationCode', twoFactorCode);

	await page.evaluate(() => {
		document.querySelector('#rememberDevice').parentElement.click();
	});
}

module.exports = {
	twoStep,
};
