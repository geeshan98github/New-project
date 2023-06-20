// module.exports = {
//   reactStrictMode: true,
//   transpilePackages: ["ui"],
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// };
//

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/customer/:CustID",
        destination: "/customer",
      },
      {
        source: "/customer/:CustID/edit",
        destination: "/register",
      },

    ]
  }
}

module.exports = nextConfig
