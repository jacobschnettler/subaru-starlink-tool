async function twoStep(page) {
	console.log('Fetching two-factor code...');

	await page.type('#verificationCode', '1a-32');

	await page.evaluate(() => {
		document.querySelector('#rememberDevice').parentElement.click();
	});
}

module.exports = {
	twoStep,
};
