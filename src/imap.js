const IMAP = require('imap');

const imapConfig = {
	user: process.env.imap_user,
	password: process.env.imap_password,
	host: process.env.imap_host,
	port: 993,
	tls: true,
};

function getRecentEmail() {
	return new Promise((resolve, reject) => {
		const imap = new IMAP(imapConfig);

		imap.once('ready', () => {
			imap.openBox('INBOX', false, (err, mailbox) => {
				if (err) {
					imap.end();
					reject(err);
					return;
				}

				imap.search(['ALL'], (err, results) => {
					if (err) {
						imap.end();
						reject(err);
						return;
					}

					// Fetch the most recent email
					const latestEmailUID = results.pop();
					const fetch = imap.fetch(latestEmailUID, {
						bodies: [''],
						struct: true,
					});

					let htmlBody = '';

					fetch.on('message', (msg) => {
						msg.on('body', (stream, info) => {
							stream.on('data', (chunk) => {
								htmlBody += chunk.toString('utf8');
							});

							stream.once('end', () => {
								imap.end();
								resolve(htmlBody);
							});
						});
					});

					fetch.once('error', (err) => {
						imap.end();
						reject(err);
					});
				});
			});
		});

		imap.once('error', (err) => {
			reject(err);
		});

		imap.connect();
	});
}

module.exports = {
	getRecentEmail,
};
