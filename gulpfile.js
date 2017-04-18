var gulp = require('gulp')
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber')
var liquid = require('gulp-liquify')
var prettify = require('gulp-jsbeautifier')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer')
var decache = require('decache')

gulp.task('scripts', function () {
  return gulp.src('./src/js/scripts.js')
  .pipe(plumber(plumber({
    errorHandler: function (err) {
      console.log(err)
      this.emit('end')
    }
  })))
  .pipe(uglify({
    preserveComments: 'license'
  }))
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest('js'))
})

gulp.task('styles', function () {
  return gulp.src('./src/scss/index.scss')
  .pipe(plumber(plumber({
    errorHandler: function (err) {
      console.log(err)
      this.emit('end')
    }
  })))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer())
  .pipe(gulp.dest('css'))
})

gulp.task('templates', function () {
  var root = './src/templates/'

  decache('./src/data.js')
  var data = require('./src/data.js')

  return gulp.src(root + 'index.html')
  .pipe(liquid(data))
  .pipe(prettify())
  .pipe(rename('index.html'))
  .pipe(gulp.dest('./'))
})

gulp.task('watch', ['scripts', 'styles', 'templates'], function () {
  gulp.watch('src/js/*.js', ['scripts'])
  gulp.watch('src/scss/*.scss', ['styles'])
  gulp.watch(['src/templates/**/*.html', 'src/data.js'], ['templates'])
})

gulp.task('serve', ['scripts', 'styles', 'templates'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: true
  })

  gulp.watch('src/js/*.js', ['scripts'])
  gulp.watch('src/scss/*.scss', ['styles'])
  gulp.watch(['src/templates/**/*.html', 'src/data.js'], ['templates']);

  gulp.watch('index.html', function () {
    gulp.src('index.html').pipe(browserSync.stream())
  })
  gulp.watch('css/index.css', function () {
    gulp.src('css/index.css').pipe(browserSync.stream())
  })
})

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }))
})

gulp.task('build', ['scripts', 'styles', 'templates'])
