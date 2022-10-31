import fs from 'fs'
const json = {
    "name": "yourProject",
    "version": "0.0.0",
    "description": "",
    "main": "engine.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "gen": "node engine.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "puppeteer": "^19.2.0"
    }
}
fs.mkdirSync( 'pages')
fs.mkdirSync( 'out'  )
fs.mkdirSync( 'test' )
if (fs.existsSync('package.json')) {
    fs.writeFileSync('package.json', JSON.stringify(json))
}
