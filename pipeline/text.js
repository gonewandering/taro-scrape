module.exports = function (page) {
  const $ = page._$
  const paragraphs = []

  page.content = page.content || {}

  $('p').each((i, hl) => {
    paragraphs.push($(hl).text())
  })

  page.content.text = paragraphs.join(' ')
  page.content.text = page.content.text.replace(/\s+/g, ' ').trim()

  return page
}
