const whitelist = ['https://localhost:' + process.env.PORT, 'https://localhost:' + process.env.PORT + '/'];

const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = { corsConfig };
