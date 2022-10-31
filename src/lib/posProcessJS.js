import puppeteer from "puppeteer"
import fs from 'fs'
import { appendFileSync, writeFileSync } from "fs";

export default async function process(pageObject) {
    let target = pageObject;
    const browser = await puppeteer.launch({ headless: true, devtools: true })
    const page = await browser.newPage()
   
   
    await page.setContent(target.html.body)
   
    await page.screenshot({ fullPage: true, path: "here.png" })
   
    let onHtmlScripts = await page.evaluate(() => {
        let i = document.querySelectorAll('script')
        let t = []
        i.forEach(each => {
            if (!each.getAttribute('src')) {
                t.push(
                    {
                        type: each.type,
                        code: each.innerHTML
                    })
                    
            }
            else {
                t.push(
                    {
                        type: each.type,
                        code: each.innerHTML,
                        src: each.getAttribute('src'),

                    })
            }
        })
        return t
    })
   
    onHtmlScripts.forEach((each) => {
        if (each.src && !each.src.startsWith('http') && !each.src.includes('://')) {
            each.code = (fs.readFileSync(target.path + each.src, 'utf-8'))
        }
       
    })
    let newBody = await page.evaluate(() => {
        let i = document.querySelectorAll('script')
        i.forEach(each => {
            if(each.getAttribute('src'))
            {
                if (!each.getAttribute('src').startsWith('http')&&
                !each.getAttribute('src').includes('://')) {
                  each.remove()
              }
            }
            else
            {
                each.remove()
            }
           
        })
        return document.body.innerHTML
    })
   
    target.html.body = newBody
    
    target.jsPaths.push(...onHtmlScripts)
    appendFileSync('test/JSProcess.json', '\n\n\n\n\n\n\n' + JSON.stringify(target, null, 2))
   
    browser.close()
   
    return target

}