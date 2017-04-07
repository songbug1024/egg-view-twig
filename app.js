'use strict';

module.exports = app => {
  app.view.use('twig', require('./lib/view'));
};
