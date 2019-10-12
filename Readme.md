# csv-express

A CSV response module for [Express](http://expressjs.com/). This is an up-to-date fork of [express-csv](https://github.com/nulltask/express-csv) that merges outstanding pull requests.


## Changes from [express-csv](https://github.com/nulltask/express-csv)
+ Adds support for adding a header row to the CSV ([#16](https://github.com/nulltask/express-csv/pull/16))
+ Better escaping of numbers so that applications such as Excel properly recognize data types
+ Actively maintained for use Express 3 and 4
+ Up to date dependencies and tests
+ Support for different encodings ( [thanks alexcrack!](https://github.com/jczaplew/csv-express/pull/1) )


## Installation

````bash
npm install csv-express
````

## API
### Methods

#### res.csv(data [, csvHeaders] [, responseHeaders] [, statusCode])

+ data (**required**): an array of arrays or objects
+ csvHeaders (*optional*): a Boolean for returning headers on the output CSV file. Default is `false`.
+ responseHeaders (*optional*): object containing custom HTTP response headers
+ statusCode (*optional*): a custom HTTP response status code. Default is 200.

### Settings
#### #separator
The delimiter to use, default is `','`.

#### #preventCast
Prevent Excels type casting, default is `false`.

#### #ignoreNullOrUndefined
Treat `null` and `undefined` values as empty strings in the output, default is `true`.

## Usage

Example:

````javascript
var express = require('express')
var csv = require('csv-express')
var app = express()

// Basic
app.get('/', function(req, res) {
  res.csv([
    ["a", "b", "c"]
  , ["d", "e", "f"]
  ])
})

// Add headers
app.get('/headers', function(req, res) {
  res.csv([
    {"a": 1, "b": 2, "c": 3},
    {"a": 4, "b": 5, "c": 6}
  ], true)
})

// Add custom name
app.get('/filename', function(req, res) {
  res.csv([
    {"a": 1, "b": 2, "c": 3},
    {"a": 4, "b": 5, "c": 6}
  ], true, undefined, undefined, 'custom-file-name.csv')
})

// Add response headers and status code (will throw a 500 error code)
app.get('/all-params', function(req, res) {
  res.csv([
    {"a": 1, "b": 2, "c": 3},
    {"a": 4, "b": 5, "c": 6}
  ], true, {
    "Access-Control-Allow-Origin": "*"
  }, 500, 'custom-name.csv')
})

app.listen(3000)
````

You can also pass an array of objects and optionally return a header row.
Useful when working with the results from database queries using [node-mysql](https://github.com/felixge/node-mysql/) or [node-postgres](https://github.com/brianc/node-postgres).

````javascript
  res.csv([
      {"name": "Sam", "age": 1},
      {"name": "Mary": "age": 2}
  ], true)

  => name, age
     Sam, 1
     Mary, 2
````



## License
The original license is as follows:

    The MIT License

    Copyright (c) 2012 Seiya Konno <nulltask@gmail.com>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    'Software'), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

All modifications from the original are CC0.

## Support
Development supported by NSF CAREER EAR-1150082 and NSF ICER-1440312
