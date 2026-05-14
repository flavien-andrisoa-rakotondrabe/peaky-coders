import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Définit le dossier actuel comme racine du projet
    root: __dirname,
  },
};

export default nextConfig;
