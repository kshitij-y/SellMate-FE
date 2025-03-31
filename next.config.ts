/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "your-other-image-domains.com",
      "lh3.googleusercontent.com", // ✅ Google profile images
      "ui-avatars.com", // ✅ Avatar fallback
    ],
  },
};

module.exports = nextConfig;
