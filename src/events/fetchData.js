const { waitForSpinner } = require('./waitForSpinner');

async function fetchData(page) {
	await waitForSpinner(page);

	await page.goto(process.env.dataPage);

	await waitForSpinner(page);

	const vehicleData = await page.evaluate(() => {
		const pElement = document.querySelector(
			'.odometerValue.vehicle-odometer-size.text-midnight.font-weight-normal'
		);

		const rawMiles = pElement
			? pElement.textContent.trim().replace(/[^\d]/g, '')
			: null;

		const untilEmptyElement = document.querySelector(
			'.vcc-fuel div.flex.justify-content-between.border-bottom.py-2 div:last-child'
		);

		const rawMilage = untilEmptyElement
			? untilEmptyElement.textContent.trim().replace(/\s*mi$/, '')
			: null;

		const tirePressureItems = document.querySelectorAll(
			'.vcc-tire-pressure__item .vcc-tire-pressure__value'
		);

		const tirePressure = [];

		tirePressureItems.forEach((item) => {
			tirePressure.push(item.textContent.trim());
		});

		return {
			rawMiles,
			rawMilage,
			tirePressure,
		};
	});

	return vehicleData;
}

module.exports = {
	fetchData,
};
