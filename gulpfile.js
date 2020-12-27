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
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/scss/style.scss",
        js: [sourceFolder + "/js/script.js", sourceFolder + "/js/admin.js"],
        img: sourceFolder + "/img/**/*.{jpg,png,svg,webp}",
        fonts: sourceFolder + "/fonts/*.ttf",
    }, //папка с исходниками
    watch:{
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,webp}",
    }, //объект содержащий пути к файлам которые нужно слушать постоянно
    clean:"./" + projectFolder + "/" //объект отвечающий за удаление этой папки при каждом запуске gulp
};

//переменные для написания сценария (тут переменные для плагинов в т.ч.)
let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(), //обновляет страницу
    fileinclude = require('gulp-file-include'), //шоб можно было один html вложить в другой
    del = require('del'), //для удаления папки dist
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'), //префиксы для обеспечения поддержки браузерами CSS3 свойств
    group_media = require('gulp-group-css-media-queries'), //группирует медиа-запросы, формирует в один 
    clean_css = require('gulp-clean-css'), //чистит и сжимает css файл на выходе
    rename = require('gulp-rename'), //шоб был и сжатый файл css и нормальный-читабельный
    uglify = require('gulp-uglify-es').default; //шоб сжимать js файлы

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

function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images(){
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts(params){
    src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images);
}//шоб следить за файлами

function clean(params){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

//нужно чтобы галп работал с новыми переменными
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;
exports.html = html;
exports.watch = watch;
exports.default = watch;

//33 минута