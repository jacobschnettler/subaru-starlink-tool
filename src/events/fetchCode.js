// Fetches most recent 2FA code

const { getRecentEmail } = require('../imap');

async function fetchCode() {
	const raw = await getRecentEmail();

	const HTML = raw.substring(
		raw.indexOf('<html'),
		raw.indexOf('</html>') + '</html>'.length
	);

	const code = HTML.substring(4621, 4627);

	return code;
}

module.exports = {
	fetchCode,
};
