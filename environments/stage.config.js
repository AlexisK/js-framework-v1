module.exports = {
    build: {
        compress: true,
        devtool: 'eval'
    },
    runtime: {
        name: 'stage',
        storageVer: '1.0',
        api: {
            path: '/api/'
        }
    }
};
