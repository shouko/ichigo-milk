const express = require('express');
const fs = require('fs')

const app = express();
app.disable('x-powered-by');

app.use((req, res, next) => {
  if (!req.headers.origin) return res.sendStatus(400);
  res.setHeader('access-control-allow-origin', req.headers.origin);
  res.setHeader('access-control-allow-credentials', true);
  return next();
})

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/s/:sid', (req, res) => {
  const fn = req.params.sid.replace(/\//g, '');
  try {
    if (!fn.endsWith('.vtt')) throw new Error('Invalid file type');
    res.contentType('text/vtt');
    return res.send(fs.readFileSync(`data/${fn}`));
  } catch(e) {
    console.log(e);
    return res.sendStatus(400);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${listener.address().port}!`);
});
