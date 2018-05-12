var URI = require('urijs')

module.exports = function (page) {
  let url = URI(page._url)

  page.domain = url.hostname()
  page.path = url.path()

  return page
}
