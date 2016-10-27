var gulp = require('gulp');
var plumber = require('gulp-plumber'); // エラー時に停止処理をしない

// SERVER
var browser = require('browser-sync');
gulp.task('server', function() {
    browser({
        server: {
            baseDir: './app/public/'
        }
    });
});

// CLEAN
var del = require('del');
gulp.task('clean', function () {
    del(['app/public/']);
});

// SASS
var sass = require('gulp-sass');
gulp.task('sass', function(){
    gulp.src(['./app/source/scss/**/*.scss', '!'+'./app/source/scss/**/_*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./app/public/css'))
        .pipe(browser.reload({stream:true}))
});

// MEDIA QUERY
var cmq = require('gulp-combine-media-queries');
gulp.task('cmq', function () {
    gulp.src('./app/public/css/*.css')
        .pipe(plumber())
        .pipe(cmq({
            log: true
        }))
    .pipe(gulp.dest('./app/public/css'));
});

//jade
var jade = require('gulp-jade');
gulp.task('jade', () => {
    return gulp.src(['./app/source/jade/**/*.jade', '!./app/source/jade/**/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./app/public'))
        .pipe(browser.reload({stream:true}));
});

//image-min
var jpegtran = require('imagemin-jpegtran');
var optipng = require('imagemin-optipng');
gulp.task('imagemin', function(){
    gulp.src('./app/source/images/**/*.jpg')
        .pipe(jpegtran()())
        .pipe(gulp.dest('./app/public/images'));
    gulp.src('./app/source/images/**/*.png')
        .pipe(optipng()())
        .pipe(gulp.dest('./app/public/images'));
});

// COPY
gulp.task( 'copy', function() {
    return gulp.src(
        [ 'app/source/js/**/*', 'app/source/images/**/*', 'app/source/fonts/**/*', 'app/source/css/**/*' ],
        { base: 'app/source' }
    )
    .pipe( gulp.dest( 'app/public/' ) );
} );

// BUILD
var runSequence = require('run-sequence');
gulp.task('build', function(callback){
    return runSequence(
        'clean',
        ['jade', 'sass', 'copy'],
        callback
    );
});

// DEFAULT
gulp.task('default', ['server'], function(){
    gulp.watch('./app/source/scss/**/*', ['sass']);
    gulp.watch('./app/source/css/**/*', ['copy']);
    gulp.watch('./app/source/jade/**/*', ['jade']);
    gulp.watch('./app/source/images/**/*', ['copy','imagemin']);
    gulp.watch('./app/source/js/**/*', ['copy']);
});