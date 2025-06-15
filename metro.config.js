const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable unstable_allowRequireContext for modern React usage
config.transformer.unstable_allowRequireContext = true;

// Configure asset extensions
config.resolver.assetExts.push(
  // Add more asset extensions if needed
  "bin",
  "txt",
  "jpg",
  "png",
  "json",
  "gif",
  "webp",
  "svg"
);

// Configure source extensions
config.resolver.sourceExts.push("jsx", "js", "ts", "tsx", "json");

module.exports = config;
