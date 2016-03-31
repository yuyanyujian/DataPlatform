'use strict';
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minimist = require('minimist');

var pwd = __dirname;

// gulp --env=pro 压缩代码，直接执行gulp，不压缩代码
var argv = require('minimist')(process.argv.slice(2));
// var config = require('./config.json');


var vendorPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.min.js',
    minChunks: Infinity,
});
var webpackConfig = {
    entry: {
        DataPlatform: './src/js/app.js',
        vendor: [
            pwd + '/src/js/lib/vue.min.js',
            pwd + '/src/js/lib/jquery.min.js',
            pwd + '/src/js/lib/bootstrap.min.js',
            pwd + '/src/js/lib/metisMenu.min.js',
            pwd + '/src/js/lib/moment.min.js',
            pwd + '/src/js/lib/datePicker.min.js',
            pwd + '/src/js/lib/jquery-table.min.js',
        ]
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'jsx-loader?harmony'
        }, {
            test: /.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [vendorPlugin],
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            'Vue': pwd + '/src/js/lib/vue.min.js',
            'jQuery': pwd + '/src/js/lib/jquery.min.js',
            '$': pwd + '/src/js/lib/jquery.min.js',
            'utils': pwd + '/src/js/utils/index.js'
        }
    },
};

// 公共头部
// var banner = ['/**',
//     ' * <%= config.name %> - <%= config.description %>',
//     ' * @version v<%= config.version %>',
//     ' */',
//     ''
// ].join('\n');

gulp.task('clean', function() {
    return gulp
        .src(['./dist/*'], { read: false })
        .pipe(clean({ force: true }))
});

gulp.task('js', function() {
    return gulp
        .src('./src/js/app.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulpIf(argv.env == 'pro', uglify()))
        // .pipe(gulpIf(argv.env == 'pro', header(banner, { config: config })))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('css', function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(concat('all.js'))
        .pipe(gulpIf(argv.env == 'pro', minifyCss()))
        // .pipe(gulpIf(argv.env == 'pro', header(banner, { config: config })))
        .pipe(rename('DataPlatform.min.css'))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('img', function() {
    return gulp
        .src('./src/img/*')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('watch', function() {
    webpackConfig.watch = argv.env != 'pro';
    gulp.watch('./src/js/*', ['js']);
    gulp.watch('./src/css/*', ['css']);
    gulp.watch('./src/img/*', ['img']);
})

gulp.task('default', ['clean'], function() {
    gulp.start(['js', 'css', 'img']);
});