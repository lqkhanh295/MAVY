import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Crafted-By",
            value: "khanhlq (https://github.com/lqkhanh295)",
          },
          {
            key: "X-Software-Architect",
            value: "khanhlq",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
