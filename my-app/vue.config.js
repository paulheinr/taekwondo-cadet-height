const fs = require('fs')

module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://localhost:3070',
                changeOrigin: true
            },
        },
        https: {
            key: fs.readFileSync("../bin/localhost+1-key.pem"),
            cert: fs.readFileSync("../bin/localhost+1.pem"),
        },
        //public: 'https://localhost:8082/'
    }
}