let body= document.createElement('body')
let head= document.createElement('head')
body.innerHTML = pages[0].html.body
head.innerHTML = pages[0].html.head
body.querySelectorAll('script').forEach((each)=>
  {
      let url = new URL(each.src);   
      url.pathname = 'src/'+pages[0].route+url.pathname
      each.src = url 
   // new Function(each.innerText)()
  })
head.querySelectorAll('link').forEach((each)=>
{
  each.remove()
})


pages[0].jsPaths.forEach((each)=>
{
  
})
let css = document.createElement('style')
pages[0].cssPaths.forEach((each)=>
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