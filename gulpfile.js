const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const yaml        = require('js-yaml');
const pug         = require('gulp-pug');
const markdown    = require('marked');
const fs          = require('fs');

var siteConfig;

// this will read a .yml file, parse it to JSON and attach it to `siteConfig`
function readSiteConfig(filename) {
   siteConfig = yaml.safeLoad(fs.readFileSync(filename))
}

gulp.task('read-config', () => {
  readSiteConfig('config.yml');
});

gulp.task('pug', () => {

  // manually parse `siteConfig.templateLocals.text.body`, because Pug doesn't
  // support dynamic content when using filters... bummer

  siteConfig.templateLocals.text.body = markdown(siteConfig.templateLocals.text.body);

  return gulp.src('src/index.pug')
   .pipe(pug({
     locals: siteConfig.templateLocals
   }))
   .pipe(gulp.dest('./'));
});

gulp.task('scripts', () => {
  return gulp.src('src/scripts/scripts.js')
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', ['read-config'], () => {

  let theme;

  if (!siteConfig.theme) theme = 'sky';
  else theme = siteConfig.theme;

  return gulp.src('src/styles/index.scss')
    .pipe(sass({ includePaths: ['node_modules/font-awesome/scss', `src/styles/themes/${theme}`] })) // dynamically inject theme from siteConfig.theme
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['read-config', 'pug', 'scripts', 'sass'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/js/app.js', ['scripts']);
  gulp.watch(['src/index.pug', 'src/templates/**/*.pug'], ['pug', browserSync.reload]);
  gulp.watch('config.yml', ['read-config', 'pug', 'scripts', 'sass', browserSync.reload]);
});

// default task
gulp.task('default', ['serve']);
