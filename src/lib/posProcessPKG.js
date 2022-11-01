import fs, { existsSync, readFileSync, writeFileSync } from 'fs'
export default function process(page) {

    let target = page
    let pkg = target.pkg ?? null
    let outPkg = {
        "dependencies": {
        }
    }

    if (pkg == null) return target
    if (existsSync('./out/package.json')) {
        outPkg = JSON.parse(readFileSync('./out/package.json', 'utf-8'))

    }

    if (outPkg.dependencies != null) {
        Object.assign(pkg.dependencies, outPkg.dependencies)
    }
    writeFileSync('./out/package.json', JSON.stringify(target.pkg, null, 2))
    target.pkg = pkg
    return target
}