module.exports = new Map([
  ['header', 'string'],
  ['description', 'text'],
  ['name', 'string'],
  ['title', 'string'],
  ['footerTitle', 'string'],
  ['email', 'string'],
  ['cta', new Map([
    ['label', 'string'],
    ['url', 'string'],
  ])],
  ['socials', new Map([
    ['twitter', 'string'],
    ['github-circled', 'string'],
    ['icon-mail-alt', 'string'],
    ['dribbble', 'string'],
    ['skype', 'string'],
    ['linkedin-squared', 'string']
  ])],
  ['experiences', [new Map([
    ['title'],
    ['timeline'],
    ['description', 'text'],
    ['responsibilities', ['text']],
  ])]],
  ['projects', [new Map([
    ['name'],
    ['description', 'text'],
    ['tags', ['string']],
    ['alt'],
    ['img'],
    ['url'],
  ])]],
  ['testimonials', [new Map([
    ['quote'],
    ['name'],
    ['title'],
  ])]]
])
