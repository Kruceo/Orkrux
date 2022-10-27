pages[pageIndex].jsPaths.forEach(scr=>
  {
    let ele = document.createElement('script')
    ele.type = scr.type
    ele.innerHTML = scr.code;
    body.appendChild(ele)
  })
head.querySelectorAll('link').forEach((each)=>
{
  each.remove()
})


pages[pageIndex].jsPaths.forEach((each)=>
{
  
})
let css = document.createElement('style')
pages[pageIndex].cssPaths.forEach((each)=>
{
  css.innerHTML += each + '\n\n'
})

head.appendChild(css)

document.documentElement.removeChild(document.querySelector('body'))
document.documentElement.appendChild(body)
document.documentElement.removeChild(document.querySelector('head'))
document.documentElement.appendChild(head)

window.dispatchEvent(new Event('load'))

window.addEventListener('load',(e)=>console.log(e))