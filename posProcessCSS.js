import puppeteer from "puppeteer"
import path from "path"
import { pathToFileURL } from "url"
import fs from 'fs'
import { appendFileSync, writeFileSync } from "fs";

export default async function process(pageObject) {
    let target = pageObject;
    const browser = await puppeteer.launch({ headless: false, devtools: true })
    const page = await browser.newPage()

    await page.setContent(target.html.head)

    await page.screenshot({ fullPage: true, path: "here.png" })

    let onHtmlScripts = await page.evaluate(() => {
        let i = document.querySelectorAll('link')
        let t = []
        i.forEach(each => {
            t.push(each.getAttribute('href'))
            console.log(each.getAttribute('href'))
            return t
        })
    })
    console.log(onHtmlScripts);
    let scriptsTerminated = false
    let newBody = await page.evaluate(() => {
        let i = document.querySelectorAll('script')
        i.forEach(each => {
            if (each.getAttribute('src')) {
                if (!each.getAttribute('src').startsWith('http') &&
                    !each.getAttribute('src').includes('://')) {
                    each.remove()
                }
            }
            else {
                each.remove()
            }

        })
        return document.body.innerHTML
    })

    target.html.body = newBody
    //console.log(onHtmlScripts)
    
    console.log('aqui tambem')
    appendFileSync('CSSProcess.json', '\n\n\n\n------\n\n\n' + JSON.stringify(target, null, 2))
   // browser.close()
    return target


}