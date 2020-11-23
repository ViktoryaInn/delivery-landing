let projectFolder = "dist";
let sourceFolder = "src";

//содержит объекты, содержащие различные пути к файлам и папкам
let path = {
    build:{
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/",
    }, //хранятся пути вывода, то куда будут выгружены обработанные файлы
    src:{
        html: sourceFolder + "/*.html",
        css: sourceFolder + "/scss/style.scss",
        js: sourceFolder + "/js/script.js",
        img: sourceFolder + "/img/**/*.{jpg, png, svg, webp}",
        fonts: sourceFolder + "/fonts/*.ttf",
    }, //папка с исходниками
    watch:{
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.{jpg, png, svg, webp}",
    }, //объект содержащий пути к файлам которые нужно слушать постоянно
    clean:"./" + projectFolder + "/" //объект отвечающий за удаление этой папки при каждом запуске gulp
};

//переменные для написания сценария (тут переменные для плагинов в т.ч.)
let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(), //обновляет страницу
    fileinclude = require('gulp-file-include'); //шоб можно было один html вложить в другой

//обновляет страницу
function browserSync(params){
    browsersync.init({
        server:{
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false //шоб этот плагин не отображал табличку с информацией об обновлении
    });
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function watchFiles(params){
    gulp.watch([path.watch.html], html);
}

let build = gulp.series(html);
let watch = gulp.parallel(build, watchFiles, browserSync);

//нужно чтобы галп работал с новыми переменными
exports.build = build;
exports.html = html;
exports.watch = watch;
exports.default = watch;

//33 минута