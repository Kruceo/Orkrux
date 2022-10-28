function genPage(index) {
  window.onload = null
  console.time('page-gen')
  let body = document.createElement('body')
  let head = document.createElement('head')
  let pageIndex = index
  body.innerHTML = pages[pageIndex].html.body
  head.innerHTML = pages[pageIndex].html.head
  
  body.querySelectorAll('a').forEach(each => {
    if (each.href.includes('http') && each.href.includes('://')) {
      each.onclick = (y) => {
        y.preventDefault()
        changePage(each.href)
      }
    }
  })
  pages[pageIndex].jsPaths.forEach(scr => {
    let ele = document.createElement('script')
    ele.type = scr.type
    ele.innerHTML = scr.code;
    body.appendChild(ele)
  })
  head.querySelectorAll('link').forEach((each) => {
    //each.remove()
  })

  let css = document.createElement('style')
  pages[pageIndex].cssPaths.forEach((each) => {
    css.innerHTML += each + '\n\n'
  })

  head.appendChild(css)
  document.documentElement.removeChild(document.querySelector('head'))
  document.documentElement.appendChild(head)
  document.documentElement.removeChild(document.querySelector('body'))
  document.documentElement.appendChild(body)
  console.timeEnd('page-gen')
  window.dispatchEvent(new Event('load'))

  window.addEventListener('load', (e) => console.log(e))

}
console.log(window.location.pathname)
function changePage(newState) {
  const stateObj = { name: newState };
  history.pushState(stateObj, '', newState);
  window.dispatchEvent(new Event('popstate'))
};

function verifyPath() {
  pages.forEach((element, index) => {

    if (element.route && '/' + element.route.toLowerCase() == window.location.pathname.toLowerCase()) {
      console.log(element.route, window.location.pathname)
      genPage(index)
    }
  });
}

window.addEventListener('popstate', (e) => {
  verifyPath()
  console.log(e)
  
})

//verifyPath()
verifyPath()
console.log(window.HTMLAnchorElement)