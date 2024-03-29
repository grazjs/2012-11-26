onload = function() {
  var body = document.body
  var slides = {}
  var slide

  function fit(el) {
    var style = el.style
    var i = 500
    var top = 0
    var left = 0

    style.fontSize = i + "px"
    style.position = "absolute"

    while (i > 5 && (top < 5 || left < 5)) {
      left = innerWidth - el.offsetWidth
      top  = innerHeight - el.offsetHeight

      style.fontSize = (i -= 5) + "px"
    }

    style.top     = top / 2 + "px"
    style.left    = left / 2 + "px"
  }

  for (var el, count = 0; el = body.firstChild;) {
    if (el.nodeType == 1) slides[++count] = el
    body.removeChild(el)
  }

  body.appendChild(document.createComment(""))

  !function sync() {
    setTimeout(sync, 50)

    var next = 0 | location.hash.match(/\d+/)

    if (slide == next) return

    next = Math.max(Math.min(count, next), 1)
    next = slides[location.hash = slide = next]

    body.replaceChild(next, body.firstChild)
    fit(next)
  }()

  document.onkeydown = function(e) {
    var i = slide + {39: 1, 37: -1}[e.which]

    if (i in slides) location.hash = i
  }

  document.ontouchstart = function(e) {
    if (e.target.href) return

    var i = slide + (e.touches[0].pageX > innerWidth / 2 ? 1 : -1)

    if (i in slides) location.hash = i
  }
}
