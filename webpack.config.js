const path = require("path");

module.exports = [{
    // 다른 모듈을 사용하고 있는 최상위 자바스크립트 파일
    entry:"./src/index.ts",
    
    output:{
        filename:"index.js",
        // output 설정은 항상 프로젝트 내부라는 보장이 없기에 절대경로를 사용함
        path:path.resolve(__dirname,"public","js")
    },
    devtool:'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module:{
        rules:[
            {
                test:/.tsx?$/,
                use:['ts-loader']
            },/*,
            {
                test: /\.json$/,
                loader: 'json-loader'
            }*/
        ]
    },
},
{
    entry: {
     app: ['./src/index.scss']
    },
    output: {
     filename: 'index.css',
     path: path.resolve(__dirname, 'public',"css")
    },
    module: {
     rules: [
      {
       test: /\.(sa|sc|c)ss$/,
       use: [
        'css-loader',
        'sass-loader',
       ],
      },
     ]
    }
   }
]