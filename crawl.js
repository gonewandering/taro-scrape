let Scrape = require('./scrape')
const _ = require('underscore')

var Crawl = class {
  constructor (options) {
    this.inProgress = 0
    this.max = options.max || 5
    this.urls = {}
    this.events = {}
    this.options = options
    this.scrape = Scrape.scrape

    this.add(options.url)
  }

  on(event, func) {
    this.events[event] = this.events[event] || []
    this.events[event].push(func)
    return true
  }

  async trigger(event, data) {
    if (this.events[event]) {
      for(var n in this.events[event]) {
        await this.events[event][n](data)
      }
    }

    return true
  }

  add(url) {
    this.urls[url] = false
  }

  async insert(data) {
    if (data.content.links) {
      for (var n in data.content.links) {
        let url = data.content.links[n].url

        if (!this.urls[url] && url.indexOf(data.domain) > -1 && url.indexOf('mailto:') == -1) {
          this.urls[url] = false
        }
      }
    }

    await this.trigger('crawl', data)
  }

  url() {
    var url = null

    for (var n in this.urls) {
      if (this.urls[n] === false) {
        url = n
        break;
      }
    }

    return url
  }

  async run() {
    this.inProgress++

    const url = this.url()

    if (!url) { return }
    this.urls[url] = true

    let page = await Scrape.scrape({
      url: url,
      pipeline: this.options.pipeline
    })

    let row = await this.insert.bind(this)(page)

    this.inProgress--

    while (this.inProgress < (this.max - 1)) { this.run() }
  }
}

module.exports = Crawl
