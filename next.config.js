/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'piggyme.s3.ap-northeast-2.amazonaws.com',
      'firebasestorage.googleapis.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
