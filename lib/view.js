'use strict';

const Twig = require('twig');
const RENDER = Symbol('TwigView#_render');

module.exports = class TwigView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.twig;
  }

  [RENDER](locals, config = {}) {
    return new Promise((resolve, reject) => {
      config = Object.assign({}, config, {
        load: template => {
          template.renderAsync(locals, config.renderParams).then(resolve).catch(reject);
        },
        error: reject,
      });

      Twig.cache(config.cache);
      Twig.twig(config);
    });
  }

  * render(filename, locals, viewOptions) {
    const config = Object.assign({}, this.config, viewOptions, { path: filename });
    return yield this[RENDER](locals, config);
  }

  * renderString(tpl, locals, viewOptions) {
    const config = Object.assign({}, this.config, viewOptions, { cache: false, data: tpl });

    Twig.cache(config.cache);
    const template = Twig.twig(config);

    return yield template.renderAsync(locals, config.renderParams);
  }

};
