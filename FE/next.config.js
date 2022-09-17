const path = require('path')

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}


// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   },
//   trailingSlash: true,
//   reactStrictMode: false,
//   experimental: {
//     outputStandalone: true,
//     jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
//   },
//   webpack: config => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
//     }

//     return config
//   }
// });

