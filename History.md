1.2.9 / 2017-05-14
==================

  * Forked by lpage
  * Significant internal code refactoring of /lib/csv-express.js
  * Added /.jshintrc (ES5 assumed)
  * Added JSHint "ignore" annotations to /lib/csv-express.js
  * Bumped version from 1.2.3 to 1.2.9 due to code refactoring
  * Updated /package.json to reflect version bump and latest author
  * Small performance improvement as compared to 1.2.3, per /support/benchmark
  * No change in public api from 1.2.3
  * Updated /support/benchmark.js to account for express().createServer() not working in some cases
  * Cleaned up /support/benchmark.js to satisfy JSHint
  * Updated /package.json & Makefile to add JSDoc dev dependency and add scripts for generating docs for /lib/csv-express.js
  * Add istanbul dev dependency for code coverage statistics; update /package.json to add "test with coverage" scripts
  * Existing tests passed on node versions: 0.10.x, 0.12.x, 4.8.x, 6.10.x, 7.9.x

1.2.3 / Date Unknown
=======================

  * (This history entry added by lpage on 2017-05-14)
  * Forked and version bump by jczaplew
  * Code updates for 1.2.3 not specified in history file by jczaplew

1.0.0 / 2015-09-18
==================

  * Fixed tests
  * Added support for a header row
  * Better handling of data types
  * Clean up


0.6.0 / 2013-03-14
==================

  * Added support for Node 0.10
  * Added Node 0.10 to travis

0.5.0 / 2012-11-01
==================

  * Support serializing an array of objects
  * Added travis.yml

0.4.1 / 2012-06-26
==================

  * Added support for Node 0.8.0

0.4.0 / 2012-06-17
==================

  * Avoid extending `http.ServerResponse.prototype` with Express 3.x

0.3.1 / 2012-04-20
==================

  * Fixed broken csv output when use `preventCast` option.

0.3.0 / 2012-03-28
==================

  * Added option `ignoreNullOrUndefined`.
  * Added test.

0.2.1 / 2012-03-28
==================

  * Adding clause setting undefined columns to an empty string. [mblackshaw]
  * Added `Makefile`.
  * Added test.
  * Added benchmark.

0.2.0 / 2012-03-21
==================

  * Add option `preventCast`.

0.1.1 / 2012-03-18
=================

  * Fixed `repository` in package.json

0.1.0 / 2012-03-18
==================

  * Added test

0.0.2 / 2012-03-17
==================

  * Add option `separator`. Default is `,`.

0.0.1 / 2012-03-17
==================

  * Initial release.
