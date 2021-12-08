const fs = require('fs');

function processFile(path, content) {
    fs.readFile(path, error => {
        if (error) {
            console.error('snowpack-plugin-filestransform-handler Error', error);
        }
        else {
            fs.writeFile(path, content, error => {
                if (error) {
                    console.error('snowpack-plugin-filestransform-handler Error', error);
                }
            });
        }
    });
}

module.exports = function (snowpackConfig, pluginOptions) {
    const opts = pluginOptions.opts || [];
    return {
        name: 'snowpack-plugin-filestransform-handler',
        async transform({filePath, contents}) {
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