const cheerio = require('cheerio')
const request = require('request-promise')
const pipeline = require('./pipeline')
var URI = require('urijs')

const get = function (url) {
  return request.get(url).then(data => {
    return cheerio.load(data)
  })
}

const scrape = async function (url) {
  let page = await get(url)

  let output = {
    _url: URI(url),
    _$: page,
    content: {},
    meta: {}
  }

  for (var p in pipeline) {
    output = pipeline[p](output)
  }

  delete output._$
  delete output._url

  return output
}

exports.scrape = scrape
