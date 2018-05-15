const language = require('@google-cloud/language')

module.exports = async function (page) {
  const client = new language.LanguageServiceClient()

  const document = {
    content: page.content.text,
    type: 'PLAIN_TEXT',
  }

  page.content = page.content || {
    entities: [],
    sentiment: [],
    topics: []
  }

  if (page.content.text.length > 200) {
    page.content.entities = await client.analyzeEntities({document: document})
    page.content.sentiment = await client.analyzeSentiment({document: document})
    page.content.topics = await client.classifyText({document: document})
  }
  
  return page
}
