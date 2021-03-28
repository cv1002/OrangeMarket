module.exports = {
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/': {
                target: 'http://localhost:8081/',
                changOrigin: true
            }
        }
    }
}