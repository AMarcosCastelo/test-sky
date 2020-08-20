'use strict';

const {src, dest, watch, series, parallel} = require('gulp');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;

const files = {
  sassPath: 'src/assets/sass/**/*.scss',
  jsPath: 'src/assets/js/**/*.js',
}

function buildSassTask(){
  return src(files.sassPath)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('dist/css'));
}

function buildJSTask(){
  return src(files.jsPath)
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

const cbString = new Date().getTime();

function cacheBustTask(){
  return src('index.html')
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest('.'))
}

function watchTask(){
  watch([files.sassPath, files.jsPath], 
    parallel(buildSassTask, buildJSTask));
}

exports.default = series(
  parallel(buildSassTask, buildJSTask),
  cacheBustTask,
)

exports.watch = series(
  parallel(buildSassTask, buildJSTask),
  cacheBustTask,
  watchTask
)