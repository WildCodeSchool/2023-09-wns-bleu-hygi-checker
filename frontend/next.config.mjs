/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fastly.picsum.photos"],
  },
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    // options de surveillance pour activer le hot reload
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
};

export default nextConfig;
