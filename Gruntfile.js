module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    // .js files for ESLint, JSHint, JSCS, etc.
    mainJsFiles: '{,grunttasks/,lib/**/,test/**/}*.js'
  })

  grunt.loadTasks('grunttasks')

  grunt.registerTask('default', ['lint', 'nsp'])
}
