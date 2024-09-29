import https from 'https';

export default async function sendWebhookMessage(webhookUR, content) {
  const data = JSON.stringify({ content });
  const webhookURL = `https://discord.com/api/webhooks/${webhookUR}`

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(webhookURL, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          console.error(`Error sending webhook message. Status code: ${res.statusCode}, Response: ${responseData}`);
          reject(new Error(`Error sending webhook message. Status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error sending webhook message:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}