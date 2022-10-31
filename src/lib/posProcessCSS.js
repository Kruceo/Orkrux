import puppeteer from "puppeteer"
import fs from 'fs'
import { appendFileSync, writeFileSync } from "fs";

export default async function process(pageObject) {
    let target = pageObject;
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.setContent(target.html.head)
    
    await page.screenshot({ fullPage: true, path: "here.png" })

    let onHtmlLinks = await page.evaluate(() => {
        let i = document.querySelectorAll('link')
        let t = []
        i.forEach(each => {
            t.push(each.getAttribute('href'))
        })
        return t
    })
    onHtmlLinks.forEach(each => {
        target.cssPaths.push(fs.readFileSync(target.path + each, 'utf-8'))
    })
    let newHead = await page.evaluate(() => {
        let i = document.querySelectorAll('link')
        i.forEach(each => {
            if (each.getAttribute('href')) {
                if (!each.getAttribute('href').startsWith('http') &&
                    !each.getAttribute('href').includes('://')) {
                    each.remove()
                }
            }
            else {
                if (each.getAttribute('href').endsWith('.css')) {
                    each.remove()
                }
            }

        })
        return document.body.innerHTML
    })
    let styleSheet = `<style>${target.cssPaths.flatMap((each) => { return "\n\n" + each + '\n\n' })}</style>`


    newHead += '\n' + styleSheet
    //console.log(styleSheet)
    target.html.head = newHead
    //console.log(onHtmlScripts)

    appendFileSync('test/CSSProcess.html', "\n\n" + newHead + '\n\n')
    browser.close()
    return target


}