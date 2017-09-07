//push origin 2017-0830-01 
//git tag -a 2017-0830-01 -m 'init'
;const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
 


var fs = require("fs");
var base = process.env.NODE_ENV
  fs.readFile('./src/js/main_base.js','utf8',function(err,data){
      var str = data;
      fs.writeFile('./src/js/main.js',str + ';function proce(){return "'+base+'"};','utf8',function(err){
      });

  });


module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js?[hash]',
    // chunkFilename: '[name].js?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit:6000,
          name: '[name].[ext]?[hash]'
        }
      },
      // {
      //   test: /\.s[a|c]ss$/,
      //   loader: 'style!css!sass'
      // }, 
      // {
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader"
      // },//编译sass
      {
        test:/\.s[a|c]ss$/,loader:ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          use: ["css-loader","sass-loader"]
        })
      },//编译css
      { test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader"
      })},
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [   //输出文件
        new ExtractTextPlugin("./dist/style.css")
    ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port:90,
    // contentBase: './dist/',
    // proxy: {
    //     // 代理解析路径
    //     '/api': {
    //       target:'http://192.168.21.188:9000/api',
    //       // target:'http://api.hc.foodiekitty.cc/api',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     }
    // }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if(process.env.NODE_ENV != 'local'){
    module.exports.output = {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        pathinfo: false,
        filename: '[name].js?[hash]',
        chunkFilename: '[name].js?[hash]'
    }
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                ) === 0
            )
        }
    }),
    //允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
        template:'./src/index.html'
    }),
    //把指定文件夹下的文件复制到指定的目录
    new TransferWebpackPlugin([
      {from: './src/js',to:"./src/js"},//字体文件
      {from: './src/img/default/',to:"./src/img/default/"},//默认缺省图片
      {from: './src/txt/',to:"./"},//微信认证文件
    ], path.resolve(__dirname,"./")),
  ])
  
}







