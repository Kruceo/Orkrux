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
  
  document.documentElement.removeChild(document.querySelector('head'))
  document.documentElement.appendChild(head)
  document.documentElement.removeChild(document.querySelector('body'))
  document.documentElement.appendChild(body)
  console.timeEnd('page-gen')
  window.dispatchEvent(new Event('load'))

}
console.log(window.location.pathname)
function changePage(newState) {
  const stateObj = { name: newState };
  history.pushState(stateObj, '', newState);
  window.dispatchEvent(new Event('popstate'))
};

function verifyPath() {
  pages.forEach((element, index) => {

    const path = window.location.pathname.replace('/', '')
    if (element?.route != null && (element.route ?? "") == path) {
      genPage(index)
      return
    }
  });
}
window.addEventListener('popstate', (e) => {
  verifyPath()
});

verifyPath();
