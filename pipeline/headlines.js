module.exports = function (page) {
  const $ = page._$
  const headlines = []

  page.content = page.content || {}

  $('h1,h2,h3,h4').each((i, hl) => {
    headlines.push({
      h: Number($(hl).prop('tagName').replace('H','')),
      value: $(hl).text().replace(/\s+/g, ' ').trim()
    })
  })

  page.content.headlines = headlines

  return page
}
