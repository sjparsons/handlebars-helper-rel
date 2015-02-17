/**
 * Handlebars Helpers: {{rel}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

// Node.js
var path = require('path');
var _ = require('lodash');

module.exports.register = function(Handlebars, options, params) {
  // var Handlebars = config.Handlebars;
  // var opts = config.options;
  // var helpers = {};

  Handlebars.registerHelper('rel', function(to) {
    var page, i;
    var context = _.extend({}, options, options.data, this);
    // if the 'site' obj exists in the config, and `site.root`
    // exists, then join the `site.root` to each filename

    var destBase = context.site.root || context.site.base;
    // console.log(destBase);
    to = context.site ? path.join(destBase, to) : to;

    for(i in options.pages) {
      if (options.pages[i].isCurrentPage) {
        page = options.pages[i];
        break;
      }
    }

    // console.log(page);
    var from = page.dirname;
    // console.log(from);
    var filename = path.basename(to);
    // console.log(filename);

    var relativePath = path.relative(from, path.dirname(to));
    // console.log(relativePath);
    var dest = path.join(relativePath, filename).replace(/\\/g, '/');
    // console.log("before: " + to + "\n\n");
    // console.log("AFTER: " + dest + "\n\n");

    return new Handlebars.SafeString(dest);
  });
  
};

