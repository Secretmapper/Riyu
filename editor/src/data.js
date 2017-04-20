import fixture from 'data';
import Immutable, { fromJS, List } from 'immutable';
import UUID from "node-uuid";

export default fromJS({
  title: fixture.title,
  header: fixture.header,
  description: fixture.description,
  name: fixture.name,
  footerTitle: fixture.footerTitle,
  email: fixture.email,
  cta: fixture.cta,
  socials: {
    twitter: 'http://twitter/',
    'github-circled': 'http://github',
    dribbble: 'http://dribbble',
    skype: 'htttp://skype',
    'mail-alt': 'mailto: email',
    'linkedin-squared': 'http://linkedin',
  },
  projects: [
    { __key: UUID.v4(), ...fixture.projects[0] },
    { __key: UUID.v4(), ...fixture.projects[1] }
  ],
  experiences: [
    { __key: UUID.v4(), ...fixture.experiences[0] },
    { __key: UUID.v4(), ...fixture.experiences[1] }
  ],
  testimonials: [
    { __key: UUID.v4(), ...fixture.testimonials[0] },
    { __key: UUID.v4(), ...fixture.testimonials[1] }
  ]
})

export const toLiquid = data => {
  const socials = data.get('socials')

  // convert 'socials' from Object to Array of Objects
  return data.setIn(
    ['socials'],
    List(socials.keySeq().toArray().map(key => (
      { icon: key, url: socials.get(key) }
   )))
  ).toJS()
}

export const isString = v => isVarTypeOf(v, String)
export const isKeyed = Immutable.Iterable.isKeyed
export const isIndexed = v => Immutable.Iterable.isIndexed(v) || isVarTypeOf(v, Array)

function isVarTypeOf(_var, _type) {
  try {
    return _var.constructor === _type;
  } catch(ex) {
    return false;         //fallback for null or undefined
  }
}

export const getScrollTop = (iwindow) => {
  if (typeof iwindow.pageYOffset !== 'undefined'){
    //most browsers except IE before #9
    return iwindow.pageYOffset;
  } else {
    var B = iwindow.document.body; //IE 'quirks'
    var D = iwindow.document.documentElement; //IE with doctype
    D = (D.clientHeight) ? D: B;

    return D.scrollTop;
  }
}
