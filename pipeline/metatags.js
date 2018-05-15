module.exports = function (page) {
  const $ = page._$
  const paragraphs = []
  page.meta.tags = page.meta.tags || []

  const meta = $('meta[name^="og:"],meta[name^="twitter:"],meta[name^="fb:"],meta[property^="og:"],meta[property^="twitter:"],meta[property^="fb:"]')

  meta.each((i, data) => {
    let val = {}
    let prop = $(data).attr('name') || $(data).attr('property')
    let value = $(data).attr('content')

    page.meta.tags.push({
      property: prop,
      value: value || null
    })
  })

  return page
}
