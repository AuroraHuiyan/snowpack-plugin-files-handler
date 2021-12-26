const fs = require('fs');

function processFile(path, content) {
    try {
        fs.writeFileSync(path, content);
    }
    catch(e) {
        console.error('snowpack-plugin-files-handler Error', e);
    }
}

module.exports = function (snowpackConfig, pluginOptions) {
    const opts = pluginOptions.opts || [];
    return {
        name: 'snowpack-plugin-filestransform-handler',
        async transform({id: filePath, contents}) {
            for (const opt of opts) {
                const {target = null, handler = null, exact = true} = opt;
                if (!exact && filePath.includes(target)) {
                    processFile(filePath, handler(contents));
                }
                else if (exact && filePath === target) {
                    processFile(filePath, handler(contents));
                }
            }
        }
    };
};