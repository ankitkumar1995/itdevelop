const path = require('path');
const withSass = require('@zeit/next-sass');
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  {
    key: 'Access-Control-Allow-Origin',
    value: 'https://missionstartupkarnataka-staging.vercel.app',
  },
  { key: 'Access-Control-Allow-Origin', value: 'http://127.0.0.1' },
  {
    key: 'Access-Control-Allow-Origin',
    value: 'https://www.missionstartupkarnataka.org',
  },

  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET,PATCH,DELETE,POST,PUT',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
];

module.exports = {
  i18n: {
    locales: ['en-US', 'kn'],
    defaultLocale: 'en-US',
  },
};

module.exports = withSass({
  cssModules: true,
});
module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
const withImages = require('next-images');
module.exports = withImages();

module.exports = {
  images: {
    domains: ['wordpress.missionstartupkarnataka.org'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
