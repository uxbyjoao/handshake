const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cleanCss    = require('gulp-clean-css');
const yaml        = require('js-yaml');
const pug         = require('gulp-pug');
const markdown    = require('marked');
const fs          = require('fs');

let siteConfig;

// this will read a .yml file, parse it to JSON and attach it to `siteConfig`
function readSiteConfig(filename) {
   siteConfig = yaml.safeLoad(fs.readFileSync(filename))
}

gulp.task('read-config', () => {
  readSiteConfig('config.yml');
  if (!siteConfig.distFolder) siteConfig.distFolder = './';
});

gulp.task('pug', ['read-config'], () => {

  // manually parse `siteConfig.templateLocals.text.body`, because Pug doesn't
  // support dynamic content when using filters... bummer

  siteConfig.templateLocals.text.body = markdown(siteConfig.templateLocals.text.body);

  return gulp.src('src/index.pug')
   .pipe(pug({
     locals: siteConfig.templateLocals
   }))
   .pipe(gulp.dest(siteConfig.distFolder));
});

gulp.task('scripts', () => {
  return gulp.src('src/scripts/scripts.js')
    .pipe(gulp.dest(`${siteConfig.distFolder}/js`));
});

gulp.task('sass', ['read-config'], () => {

  let theme;

  if (!siteConfig.theme) theme = 'mono';
  else theme = siteConfig.theme;

  return gulp.src('src/styles/index.scss')
    .pipe(sass({ includePaths: ['node_modules/font-awesome/scss', `src/styles/themes/${theme}`] })) // dynamically inject theme from siteConfig.theme
    .pipe(cleanCss())
    .pipe(gulp.dest(`${siteConfig.distFolder}/css`))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['read-config', 'pug', 'scripts', 'sass'], () => {
  browserSync.init({
    server: {
      baseDir: siteConfig.distFolder
    }
  });

  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/js/app.js', ['scripts']);
  gulp.watch(['src/index.pug', 'src/templates/**/*.pug'], ['pug', browserSync.reload]);
  gulp.watch('config.yml', ['read-config', 'pug', 'scripts', 'sass', browserSync.reload]);
});

// only builds assets, no server
gulp.task('build', ['read-config', 'pug', 'scripts', 'sass'])

// default task
gulp.task('default', ['serve']);
