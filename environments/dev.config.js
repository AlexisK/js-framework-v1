module.exports = {
    build: {
        compress: false,
        devtool: 'source-map'
    },
    runtime: {
        name: 'dev',
        storageVer: '1.0',
        api: {
            path: '/api/'
        }
    }
};
