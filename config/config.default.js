'use strict';

const path = require('path');

module.exports = appInfo => {
  return {
    /**
     * @member Config#twig
     * @property {String} [root=${baseDir}/app/view] - the root directory of twig files
     * @property {Boolean} [cache=true] - compiled functions are cached, only work using `ctx.render`
     * @property {Boolean} [debug=false] - output generated function body
     */
    twig: {
      root: path.join(appInfo.baseDir, 'app/view'),
      cache: true,
      debug: false,
    },
  };
};
