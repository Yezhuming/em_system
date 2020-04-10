var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var nodemon = require('gulp-nodemon')

gulp.task('node', function () {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  })
})

gulp.task('server', ['node'], function() {
  var files = [
    'views/**/*.html',
    'routes/**/*.js',
    'app.js'
  ]

  browserSync.init(files, {
    proxy: 'http://127.0.0.1:8081', // 和www中一致
    browser: 'chrome',
    notify: false,
    port: 8080,
    open: false
  })

  gulp.watch(files).on('change', reload)
})
