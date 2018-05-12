const _ = require('underscore')
var URI = require('urijs')

module.exports = function (page) {
  const $ = page._$
  const as = {}

  $('img').each((i, hl) => {
    if (!$(hl).attr('src')) {
      return
    }

    let a = URI($(hl).attr('src'))

    if (a.is('relative')) {
      a.origin(page._url.origin())
    }

    if (as[a]) { as[a].cnt++ } else {
      as[a] = {
        cnt: 1,
        url: a.href()
      }
    }
  })

  page.content.images = _.values(as)
  page.content.images.sort((a, b) => {
    return b.cnt - a.cnt
  })

  return page
}
