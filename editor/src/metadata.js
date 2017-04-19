import { List } from 'immutable'

module.exports = new Map([
  ['title', 'string'],
  ['header', 'string'],
  ['description', 'text'],
  ['name', 'string'],
  ['footerTitle', 'string'],
  ['email', 'string'],
  ['cta', new Map([
    ['label', 'string'],
    ['url', 'string'],
  ])],
  ['projects', [new Map([
    ['name'],
    ['description', 'text'],
    ['tags'],
    ['alt'],
    ['img'],
    ['url']
  ])]],
  // ['socials'],
  ['experiences', [new Map([
    ['title'],
    ['timeline'],
    ['description'],
    ['responsibilities'],
  ])]],
  // ['testimonials']
])
