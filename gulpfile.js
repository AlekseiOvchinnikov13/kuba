const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    browserSync = require('browser-sync').create();

const scssDir = './src/scss/**/*.scss',
    cssDir = './src/css/**/*.css',
    jsDir = './src/js/**/*.js',
    htmlDir = './**/*.html';

//Очистка
function clean() {
    return del(['build/*'])
}

//Компиляция из SCSS в CSS
function sassCompile() {
    return gulp.src(scssDir)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css'))
}

//Сборка всех CSS в один файл
function styles() {
    return gulp.src([
        '\\node_modules\\normalize.css\\normalize.css'
        , '\\node_modules\\slick-carousel\\slick\\slick.css'
        , '\\node_modules\\animate.css\\animate.css'
        //,'\\node_modules\\magnific-popup\\dist\\magnific-popup.css'
        , cssDir
    ])
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

//Сборка всех JS в один файл
function scripts() {
    return gulp.src([
        //,'node_modules/wow.js/dist/wow.js'
        //,'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
        'node_modules/slick-carousel/slick/slick.js'
        , 'node_modules/readmore-js/readmore.js'
        , jsDir
    ])
        .pipe(concat('index.js'))
        /*.pipe(uglify({
            toplevel: true
        }))*/
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

//Просмотр изменений
function watching() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(scssDir, sassCompile)
    gulp.watch(cssDir, styles)
    gulp.watch(jsDir, scripts)
    gulp.watch(htmlDir).on('change', browserSync.reload)

}

gulp.task('default', gulp.series(gulp.series(clean, sassCompile, gulp.parallel(styles, scripts)), watching));