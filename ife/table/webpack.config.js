const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
	devtool: 'eval-source-map',
  	entry:  __dirname + "/src/js/app.js",//已多次提及的唯一入口文件
  	output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
  	devServer: {
  		contentBase: "./public",
  		historyApiFallback: true,
  		inline: true
  	},
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }, {
            	test:/\.css$/,
            	/*use: [{
            		loader: "style-loader"
            	},{
            		loader: "css-loader",
					options: {
                        modules: true, // 指定启用css modules
                        localIdentName: '[local]' // 指定css的类名格式
                    }
            	}]*/
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader',
                    {
                      loader: 'image-webpack-loader',
                      options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                      },
                    },
                ]
            },
        ]
    },
    plugins:[
    	new HtmlWebpackPlugin({
    		template: __dirname + "/src/index.html"
    	}),
    	new webpack.HotModuleReplacementPlugin(),//热加载插件,
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
    ]
}