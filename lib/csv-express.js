/*
  csv-express
  Forked and modified by John J Czaplewski <jczaplew@gmail.com>

  Copyright 2011 Seiya Konno <nulltask@gmail.com>
  MIT Licensed
 */


'use strict';

var res = require('http').ServerResponse.prototype;
var iconv = require('iconv-lite');

// Configurable settings
exports.separator = ',';
exports.preventCast = false;
exports.ignoreNullOrUndefined = true;

/**
 * Stricter parseFloat to support hexadecimal strings from
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseFloat#A_stricter_parse_function
 * @param {Mixed} value
 */
function filterFloat(value) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
}

/*
 * Escape CSV field
 *
 * @param {Mixed} field
 * @return {String}
 * @api private
 */

function escape(field) {
  if (exports.ignoreNullOrUndefined && field == undefined) {
    return '';
  }
  if (exports.preventCast) {
    return '="' + String(field).replace(/\"/g, '""') + '"';
  }
  if (!isNaN(filterFloat(field)) && isFinite(field)) {
    return parseFloat(field);
  }
  return '"' + String(field).replace(/\"/g, '""') + '"';
}

 /*
  Send CSV response

  {data} - Array objects or arrays
  {csvHeaders} - If true uses the keys of the objects in {obj} to set a header row
  {headers} - Optional HTTP response headers
  {status} - Optional status code
 */

res.csv = function(data, csvHeaders, headers, status, fileName) {
  var body = '';
  var headerRow = [];
  var statusCodeSet = true

  this.charset = this.charset || 'utf-8';
  this.header('Content-Type', 'text/csv');
  if (fileName) {
    this.header('Content-disposition', `attachment; filename=${fileName}`)
  }

  // Set custom headers
  if (headers && headers instanceof Object) {
    // Use res.header() instead of res.set() to maintain backward compatibility with Express 2
    // Change to res.set() in next major version so that iteration is not required
    Object.keys(headers).forEach(function(header) {
      this.header(header, headers[header])
    }.bind(this))
  }

  // Set response status code
  if (status && Number.isInteger(status)) {
    // res.status does not work in Express 2, so make sure the error would be trapped
    try {
      this.status(status)
    } catch(error) {
      statusCodeSet = false
    }
  }

  // headerRow is used to ensure key order
  for (var prop in data[0]) {
    if (data[0].hasOwnProperty(prop)) {
      headerRow.push(prop);
    }
  }

  // Append the header row to the response if requested
  if (csvHeaders) {
    body += headerRow.join(exports.separator) + '\r\n';
  }

  // Convert the data to a CSV-like structure
  for (var i = 0; i < data.length; i++) {
    if (!(data[i] instanceof Array)) {
      data[i] = headerRow.map(function(key) {
        if (data[i].hasOwnProperty(key)) {
          return data[i][key];
        } else {
          return null;
        }
      })
    }

    body += data[i].map(escape).join(exports.separator) + '\r\n';
  }

  if (this.charset !== 'utf-8') {
    body = iconv.encode(body, this.charset);
  }

  if (!statusCodeSet) {
    return this.send(body, status)
  }

  return this.send(body)
}
