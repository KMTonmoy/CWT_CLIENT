/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allows all paths from Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google auth avatars
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // For GitHub avatars
        port: '',
        pathname: '/**',
      },
      // Add your backend server if needed
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
    ],
    // Optional: You can also use the old domains array (deprecated but works)
    domains: ['res.cloudinary.com', 'localhost'],
  },
 };

export default nextConfig;