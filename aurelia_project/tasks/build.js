import gulp from 'gulp'
import clean from './clean'
import copyFiles from './copy-files'
import processCSS from './process-css'
import processMarkup from './process-markup'
import target from './target'
import transpile from './transpile'
import {build} from 'aurelia-cli'
import project from '../aurelia.json'

export default gulp.series(
  gulp.parallel(
    clean,
    readProjectConfiguration
  ),
  gulp.parallel(
    transpile,
    processCSS,
    processMarkup,
    copyFiles
  ),
  writeBundles,
  target
)

function readProjectConfiguration() {
  return build.src(project)
}

function writeBundles() {
  return build.dest()
}

