/* eslint-disable no-undef */
'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync');
const server = browserSync.create();

const files = {
  sassPath: 'src/assets/sass/**/*.scss',
  jsPath: 'src/assets/js/**/*.js'
};

function buildSassTask() {
  return src(files.sassPath)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('dist/css'));
}

function buildJSTask() {
  return src(files.jsPath).pipe(uglify()).pipe(dest('dist/js'));
}

function reload(done) {
  server.reload();
  done();
}

function browserSyncServe(done) {
  server.init({
    server: {
      baseDir: '.',
      index: '/index.html'
    }
  });
  done();
}

const cbString = new Date().getTime();

function cacheBustTask() {
  return src('index.html')
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest('.'));
}

function watchTask() {
  watch(
    [files.sassPath, files.jsPath],
    series(buildSassTask, buildJSTask, reload)
  );
}

exports.default = series(parallel(buildSassTask, buildJSTask), cacheBustTask);

exports.watch = series(
  parallel(browserSyncServe, buildSassTask, buildJSTask),
  cacheBustTask,
  watchTask
);
