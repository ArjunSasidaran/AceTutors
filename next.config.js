/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withSvgr = require('next-svgr');

module.exports = withSvgr({
  // your next.js config
});


module.exports = nextConfig
