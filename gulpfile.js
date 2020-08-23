/* eslint-disable no-undef */
'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const server = browserSync.create();

const files = {
  sassPath: 'src/assets/sass/**/*.scss',
  jsPath: 'src/assets/js/**/*.js',
  fontsPath: 'src/assets/fonts/*',
  libsPath: 'src/assets/libs/**/*.*',
  imagesPath: 'src/assets/images/*.*'
};

function reload(done) {
  server.reload();
  done();
}

function browserSyncServe(done) {
  server.init({
    server: {
      baseDir: '.',
      index: 'index.html'
    }
  });
  done();
}

function buildSassTask() {
  return src(files.sassPath)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('dist/css'));
}

function buildJSTask() {
  return src(files.jsPath)
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              modules: false
            }
          ]
        ]
      })
    )
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function buildFontsTask() {
  return src(files.fontsPath).pipe(dest('dist/fonts'));
}

function buildImagesTask() {
  return src(files.imagesPath).pipe(dest('dist/images'));
}

function buildLibsTask() {
  return src(files.libsPath).pipe(dest('dist/libs'));
}

function replacePathsHtmlToBuild() {
  return src('./index.html')
    .pipe(replace('./src/assets/', './'))
    .pipe(replace('./dist/', './'))
    .pipe(dest('./dist'));
}

function replacePathsCSSToBuild() {
  return src('./dist/css/style.css')
    .pipe(replace('../../src/assets/', '../'))
    .pipe(dest('./dist/css'));
}

function watchTask() {
  watch(
    [files.sassPath, files.jsPath],
    series(buildSassTask, buildJSTask, reload)
  );
}

exports.build = series(
  parallel(
    buildSassTask,
    buildJSTask,
    buildFontsTask,
    buildImagesTask,
    buildLibsTask
  ),
  replacePathsHtmlToBuild,
  replacePathsCSSToBuild
);

exports.default = series(parallel(buildSassTask, buildJSTask));

exports.watch = series(
  parallel(browserSyncServe, buildSassTask, buildJSTask),
  watchTask
);
