import { Parser, parse } from 'acorn'
import fs, { existsSync, mkdirSync, readFileSync, write, writeFileSync } from 'fs'
import path from 'path'
import processJS from './src/lib/posProcessJS.js'
import processCSS from './src/lib/posProcessCSS.js'
const pagesPath = './pages/'
let pages = fs.readdirSync(pagesPath)

let pagesCompiled = []

pages.forEach(async (folder) => {
    console.log(folder)

    let page = genFromFiles(pagesPath + folder + '/')
    let posJS = await processJS(page)
    let posCSS = await processCSS(posJS)
    pagesCompiled.push(posCSS)
    
    fs.writeFileSync('out/app.js', 'const pages = ' + JSON.stringify(pagesCompiled, null, 2) + '\n' + fs.readFileSync('src/template/template.js', 'utf-8'))
    fs.writeFileSync('out/index.html',fs.readFileSync('src/template/template.html','utf-8'))
})


function genFromFiles(dir) {
    let page = {
        html: { body: null, head: null },
        cssPaths: [],
        jsPaths: [],
        route: null,
        path: null
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
            if(file == 'public')
            {   
                fs.cpSync(path.join(filePath)+ '/','./out/public',{recursive: true,force:true})
            }
            if(file == 'package.json')
            {
                console.log(fs.readFileSync(filePath,'utf-8'))
            }
        }
        
    })


    return page
}