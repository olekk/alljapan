module.exports = {
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: true
  },
  output: {
      filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
      rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader'
          },
          {
            test: /\.s?css$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
          },
          {
            test: /\.(png|jp(e*)g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 80000, // Convert images < 8kb to base64 strings
                    name: '/src/assets/img/[hash]-[name].[ext]'
                  } 
                }]
          }
      ]
  }
}