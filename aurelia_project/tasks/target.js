import gulp from 'gulp'
import project from '../aurelia.json'

export default gulp.parallel(
  index,
  scripts
)

function index () {
  return gulp.src(['index.html'])
    .pipe(gulp.dest('www'))
}

function scripts () {
  return gulp.src(['scripts/**/*'])
    .pipe(gulp.dest('www/scripts'))
}
