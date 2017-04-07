# egg-view-twig

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-view-twig.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-view-twig
[travis-image]: https://img.shields.io/travis/slevp/egg-view-twig.svg?style=flat-square
[travis-url]: https://travis-ci.org/slevp/egg-view-twig
[codecov-image]: https://img.shields.io/codecov/c/github/slevp/egg-view-twig.svg?style=flat-square
[codecov-url]: https://codecov.io/github/slevp/egg-view-twig?branch=master
[david-image]: https://img.shields.io/david/slevp/egg-view-twig.svg?style=flat-square
[david-url]: https://david-dm.org/slevp/egg-view-twig
[snyk-image]: https://snyk.io/test/npm/egg-view-twig/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-view-twig
[download-image]: https://img.shields.io/npm/dm/egg-view-twig.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-view-twig

egg view plugin for [twig].

## Install

```bash
$ npm i egg-view-twig --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.twig = {
  enable: true,
  package: 'egg-view-twig',
};

// {app_root}/config/config.default.js
exports.view = {
  mapping: {
    '.twig': 'twig',
  },
};

// twig config
exports.twig = {};
```

Create a twig file

```js
// app/view/hello.twig
hello {{ data }}
```

Render it

```js
// app/controller/render.js
exports.twig = function* () {
  yield ctx.render('hello.twig', {
    data: 'world',
  });
};
```

The file will be compiled and cached, you can change `config.twig.cache = false` to disable cache, it's disable in local env by default.

### Include

You can include both relative and absolute file.

Relative file is resolve from current file path.

```html
// app/view/a.twig include app/view/b.twig
{% include 'b.twig' %}
```

Absolute file is resolve from `app/view`.

```html
// app/view/home.twig include app/view/partial/menu.twig
{% include '/partial/menu.twig' %}
```

### Layout

You can render a view with layout also:

```html
// app/view/layout.twig

{% include 'header.twig' %}
{% block content %}{% endblock %}
{% include 'footer.twig' %}

// app/view/hello.twig

{% extends 'layout.twig' %}
{% block content %}
  Hello {{ data }}, I'm content. 
{% endblock %}
```

```js
// app/controller/render.js
exports.twig = function* () {
  const locals = {
    data: 'world',
  };

  yield ctx.render('hello.twig', locals);
};
```

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/slevp/egg-view-twig/issues).

## License

[MIT](LICENSE)

[twig]: https://github.com/twigjs/twig.js
