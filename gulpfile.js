const {src, parallel, series, dest, watch} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const webp = require('gulp-webp');

function htmtIndex(){
    return src('source/index.html')
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(dest('dist/'))
           .pipe(browserSync.stream())
}

function htmtPages(){
    return src('source/pages/**/*.html')
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(dest('dist/pages'))
           .pipe(browserSync.stream())
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: 'source/'
        }
    });
}

function cleanDist(){
    return del('dist');
}

function watching(){
    watch(['source/styles/scss/style.scss'], styles)
    watch(['source/scripts/main.js'], scripts)
    watch(['source/index.html']).on('change', browserSync.reload)
}

function styles(){
    return src('source/styles/style.scss')
           .pipe(sass({outputStyle: 'compressed'}))
           .pipe(concat('style.min.css'))
           .pipe(autoprefixer({
                overrideBrowserlist: ['last 10 version'],
                grid: true
            }))
           .pipe(dest('source/styles'))
           .pipe(dest('dist/styles'))
           .pipe(browserSync.stream())
}

function scripts(){
    return src([               
        'source/scripts/main.js'
    ])
           .pipe(concat('main.min.js'))
           .pipe(uglify())
           .pipe(dest('source/scripts'))
           .pipe(dest('dist/scripts'))
           .pipe(browserSync.stream())
}

function fonts(){
    return src('source/fonts/**/*')
           .pipe(dest('dist/fonts'))
           .pipe(browserSync.stream())
}

function images(){
    return src('source/images/**/*.jpg')
           .pipe(webp())
           .pipe(dest('dist/images'))
           .pipe(dest('source/images'))
           .pipe(src('source/images/**/*.png'))
           .pipe(src('source/images/**/*.webp'))
           .pipe(src('source/images/**/*.gif'))
           .pipe(browserSync.stream())
}

const buildLayout = series(cleanDist, htmtIndex, htmtPages, styles, scripts, images, fonts);

const buildStart = series(styles, images, fonts, parallel(browsersync, watching));

exports.cleanDist = cleanDist;
exports.watching = watching;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.images = images;
exports.fonts = fonts;
exports.htmtIndex = htmtIndex;
exports.htmtPages = htmtPages;
exports.buildLayout = buildLayout;
exports.buildStart = buildStart;