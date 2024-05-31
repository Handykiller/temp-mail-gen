const Imap = require('imap');

// IMAP configuration
const imapConfig = {
  user: 'your_email@example.com',
  password: 'your_password',
  host: 'imap.example.com',
  port: 993,
  tls: true
};

// Create an IMAP instance
const imap = new Imap(imapConfig);

// Function to handle connection error
function handleError(err) {
  console.error('Error occurred:', err);
}

// Function to retrieve emails
function fetchEmails() {
  imap.connect(); // Connect to the mail server

  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) {
        handleError(err);
        return;
      }

      // Fetch emails from the INBOX
      imap.search(['UNSEEN'], (searchErr, results) => {
        if (searchErr) {
          handleError(searchErr);
          return;
        }

        const fetchOptions = { bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)'], struct: true };

        const fetch = imap.fetch(results, fetchOptions);
        fetch.on('message', (msg, seqno) => {
          msg.on('body', (stream, info) => {
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', () => {
              console.log(`Email #${seqno}:`);
              console.log(buffer);
            });
          });
        });
        fetch.once('end', () => {
          imap.end();
        });
      });
    });
  });

  imap.once('error', handleError);
  imap.once('end', () => {
    console.log('Disconnected from the mail server');
  });
}

// Call the function to fetch emails
fetchEmails();