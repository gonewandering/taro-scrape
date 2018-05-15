const cheerio = require('cheerio')
const request = require('request-promise')
const pipeline = require('./pipeline')
var URI = require('urijs')

const get = function (url) {
  return request.get(url).then(data => {
    return cheerio.load(data)
  })
}

const scrape = async function (options) {
  let page = await get(options.url)

  let output = {
    _url: URI(options.url),
    _$: page,
    content: {},
    meta: {}
  }

  if (options.pipeline && options.pipeline.length > 0) {
    for (var p in options.pipeline) {
      let val = options.pipeline[p]
      output = pipeline[val](output)
    }
  } else {
    for (var p in pipeline) {
      output = pipeline[p](output)
    }
  }

  for (var p in output) {
    if (p.indexOf('_') == 0) {
      delete output[p]
    }
  }

  return output
}

exports.scrape = scrape
