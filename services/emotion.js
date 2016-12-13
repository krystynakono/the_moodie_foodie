const fetch = require('node-fetch');

function readEmotion(req, res, next) {
  // console.log(image);
  // console.log(req.params)
  fetch('https://api.projectoxford.ai/emotion/v1.0/recognize', {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.EMOTION_KEY1,
      'Ocp-Apim-Subscription-Key': process.env.EMOTION_KEY2,
    },
    method: 'POST',
    body: JSON.stringify(req.body),
  })
  .then(r => r.json())
  .then((emotions) => {
    res.emotions = emotions;
    console.log(emotions);
    next();
  })
  .catch(err => next(err));
}

module.exports = { readEmotion };
