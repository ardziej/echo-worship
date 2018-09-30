const fs = require('fs')
const YAML = require('yaml')

const tester = require('@absolunet/tester')

tester.lint.js(Object.assign({}, tester.all.js, ['bin/*']))
tester.lint.bash(['install-scripts/**/*'])