'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if');

module.exports = gulp.task('fonts', function () {
    return gulp.src(config.paths.src.fonts)
        .pipe(gulpif(release, gulp.dest(config.paths.dest.release.fonts), gulp.dest(config.paths.dest.build.fonts)));
});