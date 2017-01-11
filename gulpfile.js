const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const yaml        = require('js-yaml');
const fs          = require('fs');

// parse config.yml and attatch it to `siteConfig`
const siteConfig = yaml.safeLoad(fs.readFileSync('src/config.yml'));

console.log(siteConfig);

// process html
gulp.task('html', () => {
  return gulp.src('src/index.html')
   .pipe(gulp.dest('./'));
});

// process js
gulp.task('scripts', () => {
  return gulp.src('src/scripts/app.js')
    .pipe(gulp.dest('./js'));
});

// compile sass
gulp.task('sass', () => {
  return gulp.src('src/styles/index.scss')
    .pipe(sass({ includePaths: ['node_modules'] }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// start server and watch for changes
gulp.task('serve', ['html', 'scripts', 'sass'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/js/app.js', ['scripts']);
  gulp.watch('src/index.html', ['html', browserSync.reload]);
});

// default task
gulp.task('default', ['serve']);
