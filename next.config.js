/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ro', 'uk', 'en'],
    defaultLocale: 'ro',
  },
}

module.exports = nextConfig
