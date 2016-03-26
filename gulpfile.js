const gulp = require('gulp');
const stylus = require('gulp-stylus');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat-sourcemap');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('gulp-webpack');

const p = {
    css: {
        in: ['./www-src/**/*.styl'],
        out: './www-dev/css'
    },
    images: {
        in: ['./www-src/images/**/*.*'],
        out: './www-dev/images'
    }
};

function handleError (err) {
    // print error info
    gutil.log('ERROR');
    err.showStack = true;
    gutil.log(err.fileName ? err.fileName : '');

    if (err.message) {
        gutil.log(err.message);
    }

    if (err.stack) {
        gutil.log(err.stack);
    }
    // gutil.log(JSON.stringify(err, null, 4));

    // emit end to allow the stream to recover
    this.emit('end');
}

// this task makes sure all css files are pre and postprocessed
// only does not recurse
gulp.task('css', () => {
    return gulp.src(p.css.in)
        .on('error', handleError)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'compress': true,
            'include css': true
        }))
        .pipe(postcss([
            lost(),
            autoprefixer(),
            assets({
                loadPaths: ['./www-src/images/']
            })
        ]).on('error', handleError))
        .pipe(sourcemaps.write('.'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(p.css.out));
});

gulp.task('images', () => {
    return gulp.src(p.images.in)
        .on('error', handleError)
        .pipe(gulp.dest(p.images.out));
});

gulp.task('watch', () => {
    gulp.watch([p.css.in], ['css'])
        .on('error', handleError);
});

gulp.task('nodemon', () => {
    nodemon({
        script: 'index.js',
        ext: 'js jsx',
        watch: ['./lib', './www-src/scripts', './index.js'],
        ignore: ['sessions/*', 'www-dev/*'],
        verbose: false
    }).on('error', () => { console.log('err'); }); // eslint-disable-line
});

gulp.task('nodemon-ignore-frontend', () => {
    nodemon({
        script: 'index.js',
        ext: 'js jsx',
        watch: ['./lib', './index.js'],
        ignore: ['sessions/*', 'www-dev/*'],
        verbose: false
    }).on('error', () => { console.log('err'); }); // eslint-disable-line
});




gulp.task('webpack', function () {

    var options = {
        entry: {
            'loader-main': './www-src/scripts/loader-main.jsx'
        },
        watch: true,
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx|\.js?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }
            ]
        },
        output: {
            filename: '[name].js',
            sourceMapFilename: '[file].map',
            publicPath: '/scripts/'
        }
    };

    options.devtool = 'source-map';

    return gulp.src(['./www-src/scripts/**.*'])
        .pipe(webpack(options))
        .on('error', handleError)
        .pipe(gulp.dest('./www-dev/scripts'));

});

gulp.task('build-webpack', function () {

    var options = {
        entry: {
            'loader-main': './www-src/scripts/loader-main.jsx'
        },
        watch: false,
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                                 query: {
                        presets: ['react', 'es2015']
                    }
    }
            ]
        },
        output: {
            filename: '[name].js',
            sourceMapFilename: '[file].map',
            publicPath: '/scripts/'
        }
    };

    options.devtool = 'source-map';

    return gulp.src(['./www-src/scripts/**.*'])
               .pipe(webpack(options))
               .on('error', handleError)
               .pipe(gulp.dest('./www-dev/scripts'));
});

gulp.task('dev', ['css', 'images', 'watch', 'nodemon', 'webpack']);
gulp.task('dev-ignore-frontend', ['css', 'images', 'watch', 'nodemon-ignore-frontend', 'webpack']);

gulp.task('build', ['css', 'images', 'build-webpack']);
