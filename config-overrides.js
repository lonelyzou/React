const { override, fixBabelImports,addBabelPlugins,addLessLoader} = require('customize-cra');
require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' }
    }),
    addBabelPlugins(
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    )
);
