import fs, { existsSync, readFileSync, writeFileSync } from 'fs'
export default function process(page)
{
    let target = page
    let pkg = target.pkg
    let outPkg
    if(!pkg)return
    if(existsSync('./out/package.json'))
    {
        outPkg = JSON.parse(readFileSync('./out/package.json','utf-8'))
    }
    Object.assign(pkg.dependencies,outPkg.dependencies)
    writeFileSync('./out/package.json',JSON.stringify(target.pkg,null,2))
    target.pkg = pkg
    return target
//rff.cavalo += {rrr: 'ss'}
}