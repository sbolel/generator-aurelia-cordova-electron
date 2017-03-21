import del from 'del'
import gulp from 'gulp'
import project from '../aurelia.json'

export default gulp.parallel(
  index,
  scripts
)

function index(done) {
  return del('www/index.html', () => done())
}

function scripts(done) {
  return del('www/scripts/*+(.js|.js.map)', () => done())
}

