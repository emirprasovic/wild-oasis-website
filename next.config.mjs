/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gygoirdiysfdkvrexfur.supabase.co",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
};

export default nextConfig;
