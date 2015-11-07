// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var browserify = require('browserify');
var preprocessify = require('preprocessify');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('client/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// css
gulp.task('less', function () {
    gulp.src('./client/content/css/*.less')
        .pipe(less())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./target/content/css'));
});

// Concatenate & Minify JS
gulp.task('js-all', function() {

    var pathToJSApp = './client/scripts/index.js';

    return browserify(pathToJSApp)
         .transform(preprocessify({DEBUG: true}))
         .bundle()
        .on('error', function (err) {
            console.error('Error in Browserify: \n', err.message);
            this.emit('end');
        })
        //.pipe(plumber())
        .pipe(source('bundled.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({basename: 'main', suffix: '.min'}))
        .pipe(filesize())
        .pipe(gulp.dest('target/scripts'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('client/scripts/**/*.js', ['lint', 'js-all']);
    gulp.watch('client/content/**/*.less', ['less']);
    gulp.watch('client/scripts/**/*.vert', []);
    gulp.watch('client/scripts/**/*.frag', []);
});

// Default Task
gulp.task('default', ['lint', 'js-all', 'watch']);