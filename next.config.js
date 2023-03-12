/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });
  
    return config;
  },
  async redirects() {
    return [
      {
        source: "/treasury",
        destination: "/treasury/mint",
        permanent: false,
      },
      {
        source: "/finance",
        destination: "/finance/borrow",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
