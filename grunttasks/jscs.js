module.exports = function (grunt) {
  'use strict'

  grunt.config('jscs', {
    app: [
      '<%= mainJsFiles %>'
    ],
    options: {
      config: '.jscsrc'
    }
  })
}
