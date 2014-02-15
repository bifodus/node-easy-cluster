'use strict';

module.exports.fileExists = fileExists;

var fs = require('fs');

/**
 * @param {string} absolutePath
 * @return {boolean} if the path exists and is a file.
 */
function fileExists(absolutePath){
  return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile();
}