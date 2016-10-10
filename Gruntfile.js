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


server.register({
  register: require('../index.js'),
  options: hpkpOptions
}, function (err) {
  if (err) {
    console.error('Failed to load plugin:', err)
  }
});