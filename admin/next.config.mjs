/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '**',
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: 'https', 
            hostname: '**',
          }
        ],
    },
};

export default nextConfig;
