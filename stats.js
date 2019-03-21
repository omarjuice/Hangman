const { promisify } = require('util');
const exec = promisify(require('child_process').exec)


const srcStats = async (label = "STATS", include = [], exclude = []) => {
    if (!Array.isArray(include) || !Array.isArray(exclude)) {
        throw new Error('STATS ERROR: include and exclude must be arrays')
    }
    let getStats = "git diff --shortstat `git hash-object -t tree /dev/null`"
    getStats += exclude.reduce((acc, ext) => {
        if (ext[0] !== '.') { ext = '.' + ext }
        return acc + " ':(exclude)*" + ext + "'"
    }, "")
    getStats += include.reduce((acc, ext) => {
        if (ext[0] !== '.') { ext = '.' + ext }
        console.log(ext);
        return acc + " ':*" + ext + "'"
    }, "")
    const stats = await exec(getStats)
    console.log(`${label}: ${stats.stdout}`)
}

// src_stats();
srcStats('REACT', ['jsx'])
srcStats('REDUX', ['.js'], ['test.js'])
srcStats('HTML', ['html'], [])
srcStats('CSS', ['css'])
srcStats('TOTAL', [], ['json', 'svg', 'png'])

