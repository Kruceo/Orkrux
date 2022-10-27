import {Parser,parse} from 'acorn'
import fs, { existsSync, mkdirSync, readFileSync, write, writeFileSync } from 'fs'
const pagesPath = './app/routes/pages/'
let pages = fs.readdirSync(pagesPath)

let pagesCompiled = []
pages.forEach(folder => {
    console.log(folder)
    let page = {
        html: { body: null, head: null },
        cssPaths: [],
        jsPaths: [{}],
        route: null
    }
    let content = fs.readdirSync(pagesPath + folder + '/');
    let css
    content.forEach(file => {
        const filePath = pagesPath + folder + '/' + file
        if (file.endsWith('.html')) {
            let read = fs.readFileSync(filePath, 'utf-8')
            page.html.body = read.slice(read.lastIndexOf("<body>") + 6, read.indexOf("</body>"))
            page.html.head = read.slice(read.lastIndexOf("<head>") + 6, read.indexOf("</head>"))
            if (read.lastIndexOf("<route>") >= 0) {
                page.route = read.slice(read.lastIndexOf("<route>") + 7, read.indexOf("</route>"))
            }
        }
    })
    content.forEach(file => {
        const filePath = pagesPath + folder + '/' + file
        if (file.endsWith('.js')) {
            let read = fs.readFileSync(filePath, 'utf-8')
            
            const parsed = parse(read,{ecmaVersion: 2021,allowImportExportEverywhere: true}).body
            const types = parsed.map((declaration)=>
            {
                return declaration.type
            })
            if(types.includes('ImportDeclaration'))
            {
                page.jsPaths.push({type: "es",code: read})
            }
            else
            {
                page.jsPaths.push({type: "cjs",code: read})
            }
            if (!existsSync('out/src/' + page.route + '/')) {
                mkdirSync('out/src/' + page.route + '/', { recursive: true })
            }
            writeFileSync('out/src/' + page.route + '/' + file, readFileSync(filePath, 'utf-8'))

        }

        if (file.endsWith('.css')) {
            let read = fs.readFileSync(filePath, 'utf-8')
            page.cssPaths.push(read)
            css += '\n\n' + read

        }

    })

    pagesCompiled.push(page)
    fs.writeFileSync('out/app.js', 'const pages = ' + JSON.stringify(pagesCompiled, null, 2) + '\n' + fs.readFileSync('template.js', 'utf-8'))
    //writeFileSync('out/index.css',css)
})