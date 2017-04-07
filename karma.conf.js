'use strict'
const path = require('path')
const project = require('./aurelia_project/aurelia.json')

let testSrc = [
  { pattern: project.unitTestRunner.source, included: false },
  'test/aurelia-karma.js'
]

let output = project.platform.output
let appSrc = project.build.bundles.map(x => path.join(output, x.name))
let entryIndex = appSrc.indexOf(path.join(output, project.build.loader.configTarget))
let entryBundle = appSrc.splice(entryIndex, 1)[0]
let files = [entryBundle].concat(testSrc).concat(appSrc)

module.exports = function (config) {
  config.set({
    basePath: '',
    files: files,
    exclude: [],

    browsers: ['PhantomJS'],
    frameworks: [project.testFramework.id],
    reporters: ['progress'],

    autoWatch: true,
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO,
    port: 9876,

    babelPreprocessor: { options: project.transpiler.options },
    preprocessors: {
      [project.unitTestRunner.source]: [project.transpiler.id]
    },

    // client.args must be a array of string.
    // Leave 'aurelia-root', project.paths.root in this order so we can find
    // the root of the aurelia project.
    client: {
      args: ['aurelia-root', project.paths.root]
    }
  })
}
