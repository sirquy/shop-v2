const gulp = require('gulp')
    , http = require('http')
    , sass = require('gulp-sass')
    , sourcemaps = require('gulp-sourcemaps')
    , ejs = require('gulp-ejs')
    , minify = require('gulp-cssnano')
    , st = require('st')
    , path = require('path')
    , plumber = require('gulp-plumber')
    , browserSync = require('browser-sync').create();



gulp.task('sass', () => {
    gulp.src('./dist/main/css/main.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.toString());
                this.emit('end');
            }
        })
        )
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest('./dist/main/css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(browserSync.stream())
});

gulp.task('ejs', () => {
    gulp.src('./dev/*.ejs')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.toString());
                this.emit('end');
            }
        }) 
        )
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(gulp.dest(path.join(__dirname, '/')))
        .pipe(browserSync.stream())
})

gulp.task('watch-sass', () => {
    gulp.watch([
        './dist/main/css/**/*.scss',
        './dist/main/css/*.scss'
    ],
        ['sass']).on('change', browserSync.reload);
})
gulp.task('watch-ejs', () => {
    gulp.watch([
        './dev/**/*.ejs'],
        ['ejs']).on('change', browserSync.reload);
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.run(['watch-ejs', 'watch-sass'])
});


