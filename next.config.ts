import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com data:;
  media-src 'self' blob: data:;
  connect-src 'self' https:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

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
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          // Anti Clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Anti MIME Sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy (Camera, Mic, Geo disabled)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // HTTP Strict Transport Security (HSTS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Cross-site scripting legacy filter
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Author & Engineering metadata
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
