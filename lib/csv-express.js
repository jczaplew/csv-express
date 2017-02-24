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

/*
 * Escape CSV field
 *
 * @param {Mixed} field
 * @return {String}
 * @api private
 */

function escape(field) {
  if (exports.ignoreNullOrUndefined && field === undefined) {
    return '';
  }
  if (exports.preventCast) {
    return '="' + String(field).replace(/\"/g, '""') + '"';
  }
  if (!isNaN(parseFloat(field)) && isFinite(field)) {
    return parseFloat(field);
  }
  return '"' + String(field).replace(/\"/g, '""') + '"';
}



 /*
  Send CSV response

  {data} - Array objects or arrays
  {csvHeaders} - If true uses the keys of the objects in {obj} to set a header row
  {headers} - Optional response headers
  {stats} - Optional status code
 */

res.csv = function(data, csvHeaders, headers, status) {
  var body = '';

  this.charset = this.charset || 'utf-8';
  this.header('Content-Type', 'text/csv');
  
  var csvHeader_arr = [], csvHeader_pos = {}; //twice for better access of position

  data.forEach(function(item) {
    var arr = [];
    if (item instanceof Array) arr = item;
    else 
    for (var prop in item) { //former objToArray but with correct header_csv position
      if (item.hasOwnProperty(prop)) {
        if (csvHeader_pos[prop] === undefined) {
          csvHeader_pos[prop] = csvHeader_arr.length; 
          csvHeader_arr.push(prop);
        }
        arr[csvHeader_pos[prop]] = item[prop];
      }
    }
    body += arr.map(escape).join(exports.separator) + '\r\n';
  });
  
  if (csvHeaders && csvHeader_arr.length) body = csvHeader_arr.map(escape).join(exports.separator) + '\r\n' + body;

  if (this.charset !== 'utf-8') {
    body = iconv.encode(body, this.charset);
  }

  return this.send(body, headers, status);
}
