module.exports={
    devServer:{
        proxy: {
            '/api': {
              //设置你调用的接口域名和端口号 别忘了加http
              target: 'https://api.binstd.com/recipe',
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
                //这里理解成用‘/web'代替target里面的地址，后面组件中我们掉接口时直接用web代替 比如我要调用'http://192.168.12.36:9000/api/SourceManage/user/add'，直接写‘/web/user/add'即可
              }
            }
          }
    }
}