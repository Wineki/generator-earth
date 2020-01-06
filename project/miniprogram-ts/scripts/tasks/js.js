const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('../tsconfig.json', {
    noEmitOnError: false,
});
const path = require('path');
const devConf = require('../../config/dev');
const prodConf = require('../../config/prod');

const conf = process.env.NODE_ENV === 'prod' ? prodConf : devConf;
const dist = conf.output;
const inputSource = conf.input;


function js() {
    const tsResult = gulp.src(path.resolve(inputSource, '../src/**/*.ts')) // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(dist));
}

module.exports = js;
