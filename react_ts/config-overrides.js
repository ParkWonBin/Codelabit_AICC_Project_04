module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "fs": false,
    "net": false,
    "tls": false
  });
  config.resolve.fallback = fallback;
  return config;
};
