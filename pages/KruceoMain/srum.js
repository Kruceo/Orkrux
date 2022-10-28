function goTo(element)
{
    const target = document.querySelector(element)

    document.querySelector("a").offsetTop
    window.scroll({top: target.offsetTop,behavior:"smooth"})
}