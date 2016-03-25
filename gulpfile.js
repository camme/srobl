var gulp = require('gulp');
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');
var prefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var fs = require('fs');
var poststylus = require('poststylus');

var path = require('path');

var webpack = require('gulp-webpack');

var p = {
    css : { in : './www-src/css/*.styl', all: './www-src/**/*.styl', out: './www-dev/css'}
};

function handleError(err) {
    // print error info
    gutil.log('ERROR');
    gutil.log(err.fileName ? err.fileName : '');
    gutil.log(err.stack);
    //fs.writeFileSync('./.errorz', err.stack, 'utf8');
    //gutil.log(JSON.stringify(err, null, 4));

    // emit end to allow the stream to recover
    this.emit('end');
}

// this task makes sure all css files are pre and postprocessed
// only does not recurse
gulp.task('css', () => {
    return gulp.src([p.css.in])
        .pipe(stylus({
            'compress': true,
            'include css': true,
            use: [
                poststylus(['lost'])
            ]
        }))
        .on('error', handleError)
        .pipe(prefixer())
        .pipe(gulp.dest(p.css.out));
});

gulp.task('watch-css', () => {
    gulp.watch([p.css.in, p.css.all], ['css'])
        .on('error', handleError);
});

gulp.task('nodemon', () => {
    nodemon({
        scripts : 'index.js',
        ext : 'js',
        ignore : ['www-src/**/*.*', 'www-dev/scripts/loader-main.js'],
        verbose : true
    }).on('error', () => { console.log("err"); });
});

gulp.task("webpack", function() {

    var options = {
        entry: { 'loader-main': './www-src/scripts/loader-main.jsx' },
        watch: true,
        resolve: { extensions: ['', '.js', '.jsx'] },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }]
        },
        output: {
            filename: "[name].js",
            sourceMapFilename: '[file].map',
            publicPath: '/scripts/'
        }
    };

    options.devtool = 'source-map';
    //options.devtool = 'eval';

    return gulp.src([ './www-src/scripts/**.*' ])
        .pipe(webpack(options))
        .on('error', handleError)
        .pipe(gulp.dest('./www-dev/scripts'));

});

gulp.task('dev', ['css', 'watch-css', 'nodemon', 'webpack'], () => {});
gulp.task('watch', ['css', 'watch-css', 'webpack'], () => {});
