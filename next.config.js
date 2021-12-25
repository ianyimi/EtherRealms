// keep this so that it uses webpack 4 instead of 5
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
        module: "empty"
      }
    }

    return config
  }
}
