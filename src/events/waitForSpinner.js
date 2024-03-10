async function waitForSpinner(page) {
	await page.waitForSelector('#processingSpin');

	await page.waitForSelector('#processingSpin', {
		hidden: true,
	});
}

module.exports = {
	waitForSpinner,
};
