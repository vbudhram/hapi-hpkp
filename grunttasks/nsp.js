module.exports = function (grunt) {
  'use strict'

  grunt.config('nsp', {
    output: 'summary',
    package: grunt.file.readJSON('package.json')
  })
}
