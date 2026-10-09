import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The press kit moved from /epk to /booking; its files stay under /epk/*
  redirects() {
    return [
      { source: "/epk", destination: "/booking", permanent: false },
      { source: "/epk/en", destination: "/booking/en", permanent: false },
    ];
  },
};

export default nextConfig;
