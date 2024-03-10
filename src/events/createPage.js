async function createPage(browser) {
	const page = await browser.newPage();

	console.log('Opening Subaru Starlink');

	await page.setViewport({
		width: 1920,
		height: 1080,
	});

	await page.goto(process.env.loginPage);

	return page;
}

module.exports = {
	createPage,
};
