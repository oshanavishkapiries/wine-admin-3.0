/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '**',
          },
          {
            protocol: 'https', 
            hostname: '**',
          }
        ],
    },
};

export default nextConfig;
