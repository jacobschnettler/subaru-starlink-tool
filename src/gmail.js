const Imap = require('imap');
const inspect = require('util').inspect;

const imap = new Imap({
	user: 'your_protonmail_username',
	password: 'your_protonmail_password',
	host: '127.0.0.1', // Assuming ProtonMail Bridge is running locally
	port: 1143, // Default IMAP port for ProtonMail Bridge
	tls: true, // Use TLS
});

function openInbox(cb) {
	imap.openBox('INBOX', true, cb);
}

imap.once('ready', function () {
	openInbox(function (err, box) {
		if (err) throw err;
		var f = imap.seq.fetch('1:3', {
			bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
			struct: true,
		});
		f.on('message', function (msg, seqno) {
			console.log('Message #%d', seqno);
			var prefix = '(#' + seqno + ') ';
			msg.on('body', function (stream, info) {
				var buffer = '';
				stream.on('data', function (chunk) {
					buffer += chunk.toString('utf8');
				});
				stream.once('end', function () {
					console.log(
						prefix + 'Parsed header: %s',
						inspect(Imap.parseHeader(buffer))
					);
				});
			});
			msg.once('attributes', function (attrs) {
				console.log(
					prefix + 'Attributes: %s',
					inspect(attrs, false, 8)
				);
			});
			msg.once('end', function () {
				console.log(prefix + 'Finished');
			});
		});
		f.once('error', function (err) {
			console.log('Fetch error: ' + err);
		});
		f.once('end', function () {
			console.log('Done fetching all messages!');
			imap.end();
		});
	});
});

imap.once('error', function (err) {
	console.log(err);
});

imap.once('end', function () {
	console.log('Connection ended');
});

imap.connect();
