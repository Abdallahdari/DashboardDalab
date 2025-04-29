import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["igojpyhmueeufmrtfsbe.supabase.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
