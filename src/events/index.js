const loginEvent = require('./login');
const twoStepEvent = require('./2step');
const openBrowserEvent = require('./openBrowser');
const createPageEvent = require('./createPage');
const waitForSpinnerEvent = require('./waitForSpinner');

module.exports = {
	...loginEvent,
	...twoStepEvent,
	...openBrowserEvent,
	...createPageEvent,
	...waitForSpinnerEvent,
};

// .then(async (response) => {
//     const cookies = response.headers['set-cookie']; // Get cookies from the response

//     console.log(cookies);

//     const headersWithCookies = {
//         ...headers,
//         Cookie: cookies.join('; '), // Set cookies for the second request
//     };

//     // axios
//     // 	.post(
//     // 		'https://www.mysubaru.com/profile/twoStepAuth/sendVerification.json',
//     // 		credentials,
//     // 		{
//     // 			headers: headersWithCookies, // Include cookies in headers for the second request
//     // 		}
//     // 	)
//     // 	.then(({ data }) => {
//     // 		console.log(data);
//     // 	})
//     // 	.catch((error) => {
//     // 		// console.error('Error sending verification:', error);
//     // 	});
// })
// .catch((error) => {
//     console.error('Error logging in:', error);
// });
