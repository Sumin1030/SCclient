const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {  //도메인 api로 호출
      target: 'http://ec2-18-217-16-111.us-east-2.compute.amazonaws.com:5001/', //통신할 서버의 도메인주소
      changeOrigin: true,
    })
  )
}