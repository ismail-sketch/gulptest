const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')



// Пути к изначальным файлам и файлам назначения============================
const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/css',
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js',
    }
}

// Функция для очистки папки dist==================
function clean() {
    return del(['dist'])
}

//Задача для обработки стилей=============================
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

//Задача для обработки скриптов=============================
function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: 'true'
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

// Функция watcher==============================================
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}
//=====================================================

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

//Экспорты====================================
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;