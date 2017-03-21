import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import insert from 'gulp-insert'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import project from '../aurelia.json'
import {build} from 'aurelia-cli'

const VENDOR_CSS_PATH = './assets/css/index.css'

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      includePaths: ['.'],
      outputStyle: 'compressed',
      precision: 10
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
    .pipe(sourcemaps.write())
    .pipe(concat(VENDOR_CSS_PATH))
    .pipe(insert.prepend('<template>'))
    .pipe(insert.append('</template>'))
    .pipe(rename(file => {
      file.extname = '.css.html'
      return file
    }))
    // .pipe(gulp.dest('www'))
    .pipe(build.bundle())
}

