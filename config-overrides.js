const { override, fixBabelImports } = require("customize-cra");

module.exports = override((config, env) => {
  config.module.rules.push({
    loader: "webpack-ant-icon-loader",
    enforce: "pre",
    include: [require.resolve("@ant-design/icons/lib/dist")]
  });
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  });
  return config;
});
