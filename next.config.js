const nextAuth = require('next-auth');

module.exports = nextAuth({
  secret: 'martin-skills1997',
  jwt: {
    secret: 'martin-skills1997',
    expiresIn: '30d',
  },
  i18n: {
    locales: ['de', 'fr', 'en'],
    defaultLocale: 'de',
  },
  reactStrictMode: true,
});

