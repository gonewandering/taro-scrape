const _ = require('underscore')
var URI = require('urijs')

module.exports = function (page) {
  const $ = page._$
  const as = {}

  $('a').each((i, hl) => {
    if (!$(hl).attr('href')) {
      return
    }

    let a = URI($(hl).attr('href'))

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

  page.content.links = _.values(as)
  page.content.links.sort((a, b) => {
    return b.cnt - a.cnt
  })

  return page
}
