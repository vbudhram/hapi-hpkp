module.exports = function (grunt) {
  'use strict'

  grunt.config('eslint', {
    options: {
      eslintrc: '.eslintrc'
    },
    files: [
      '{,grunttasks/,lib/**/,test/**/}*.js'
    ]
  })
  grunt.registerTask('quicklint', 'lint the modified files', 'newer:eslint')
}
