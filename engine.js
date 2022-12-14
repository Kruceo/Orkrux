
import fs, { existsSync, mkdirSync, readFileSync, write, writeFileSync } from 'fs'
import path from 'path'
import templateJS from './src/template/templateJS.js'
import templateHTML from './src/template/templateHTML.js'
import processJS from './src/lib/posProcessJS.js'
import processCSS from './src/lib/posProcessCSS.js'
import posProcessPKG from './src/lib/posProcessPKG.js'
const outPath = './out/'
const testPath = './test/'
const pagesPath = './pages/'
let pages = []

let pagesCompiled = []


export async function build() {
    pages = fs.readdirSync(pagesPath)
    verifyPaths()
    for (const fold of pages) {
        await gen(fold)

    }
}
function loading(time) {
    let stage = 0;
    let stages = [
        '―',
        '/',
        '|',
        '\\',
        '―']
    stages.forEach((each, index) => stages[index] = each.padEnd(20, " "))
    return setInterval(() => {

        if (stage >= stages.length - 1) {
            stage = 0
        }
        else {
            stage++;
        }
        process.stdout.write('\r' + stages[stage])

    }, 100)
}
async function gen(folder) {
    console.log(process.cwd())
    const load = loading(111)
    console.log(folder)
    let page = genFromFiles(pagesPath + folder + '/')
    let posJS = await processJS(page)
    let posCSS = await processCSS(posJS)
    let posPKG = posProcessPKG(posCSS)


    pagesCompiled.push(posPKG)
    
    fs.writeFileSync('out/app.js', 'const pages = ' + JSON.stringify(pagesCompiled, null, 2) + '\n' + templateJS)
    fs.writeFileSync('out/index.html', templateHTML)
    clearInterval(load)
    process.stdout.clearLine(-1)
    console.log('\nComplete ' + folder)
    

}


function verifyPaths() {
    if (!existsSync(outPath)) {
        mkdirSync(outPath)
    }
    if (!existsSync(testPath)) {
        mkdirSync(testPath)
    }
}
function genFromFiles(dir) {
    let page = {
        html: { body: null, head: null },
        cssPaths: [],
        jsPaths: [],
        route: null,
        path: null,
        pkg: null
    }
    if (!existsSync('./out/package.json')) {
        writeFileSync('./out/package.json', JSON.stringify(
            {
                dependencies:
                {

                }
            }))
    }
    let content = fs.readdirSync(dir);
    content.forEach(file => {

        const filePath = dir + '/' + file
        if (file.endsWith('.html')) {
            let read = fs.readFileSync(filePath, 'utf-8')
            page.html.body = read.slice(read.lastIndexOf("<body>") + 6, read.indexOf("</body>"))
            page.html.head = read.slice(read.lastIndexOf("<head>") + 6, read.indexOf("</head>"))
            if (read.lastIndexOf("<route>") >= 0) {
                page.route = read.slice(read.lastIndexOf("<route>") + 7, read.indexOf("</route>"))
            }
            page.path = dir
            console.log("∟ " + file + ' => ' + page.route)
        }
    })
    content.forEach(file => {
        const filePath = dir + '/' + file
        if (fs.lstatSync(filePath).isDirectory()) {
            console.log('∟ ' + file + '/')
            if (file == 'public') {
                fs.cpSync(path.join(filePath) + '/', './out/public', { recursive: true, force: true })
            }
        }
        if (file == 'package.json') {
            page.pkg = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
    })


    return page
}