const loginEvent = require('./login');
const twoStepEvent = require('./2step');
const openBrowserEvent = require('./openBrowser');
const createPageEvent = require('./createPage');
const waitForSpinnerEvent = require('./waitForSpinner');
const fetchCodeEvent = require('./fetchCode');
const fetchDataEvent = require('./fetchData');

module.exports = {
	...loginEvent,
	...twoStepEvent,
	...openBrowserEvent,
	...createPageEvent,
	...waitForSpinnerEvent,
	...fetchCodeEvent,
	...fetchDataEvent,
};
