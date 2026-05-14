import type { NextConfig } from "next";

const nodeEnv = process.env.NODE_ENV;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const remotePatterns: { protocol: "http" | "https"; hostname: string }[] = [
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "https", hostname: "lh3.googleusercontent.com" },
  { protocol: "https", hostname: "res.cloudinary.com" },

  { protocol: "https", hostname: "platform-lookaside.fbsbx.com" },
  { protocol: "https", hostname: "scontent.xx.fbcdn.net" },
  { protocol: "https", hostname: "graph.facebook.com" },
];

if (apiUrl) {
  const url = new URL(apiUrl);
  const protocol = url.protocol.replace(":", "");

  if (protocol === "http" || protocol === "https") {
    remotePatterns.push({
      protocol,
      hostname: url.hostname,
    });
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Définit le dossier actuel comme racine du projet
    root: __dirname,
  },
  images: {
    remotePatterns,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  reactStrictMode: nodeEnv === "development" ? true : false,
};

export default nextConfig;
