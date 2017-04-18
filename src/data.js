module.exports = {
  title: 'John Smith',
  header: "Hi, I'm John Smith",
  description: "I'm a college junior currently taking up Computer Science in University X. I'm a freelance developer with 4 years of experience, having worked with clients such as X, Y, Z. I enjoy building everything from small business sites to rich interactive web apps.",
  name: 'John Smith',
  footerTitle: 'Software Engineer',
  email: 'johnsmith@mail.com',
  cta: {
    label: 'Get my resume',
    url: 'resume.pdf',
  },
  socials: [
    { icon: 'twitter', url: '//' },
    { icon: 'github-circled', url: '//' },
    { icon: 'mail-alt' }, // mail alt automatically links to mailto:email
    { icon: 'dribbble', url: '//' },
    { icon: 'skype', url: '//' },
    { icon: 'linkedin-squared', url: '//' },
  ],
  projects: [
    {
      name: 'Combustion',
      description: 'Combustion is a sleek, modern web client for the transmission bittorrent client.',
      tags: ['React', 'Javascript', 'Webpack', 'Mobx', 'CSSModules'],
      alt: 'Combustion Screenshot', // alt description of image for accessibility. defaults to '{{name}} Screenshot'
      img: 'combustion.png',
      url: '//'
    },
    {
      name: 'Merc-01',
      description: 'Merc-01 is a fast paced twin-stick shooter built on top of pyglet.',
      tags: ['Python', 'WebGL', 'Pyglet'],
      img: 'merc-01.png',
      url: '//'
    }
  ],
  experiences: [
    {
      title: 'Senior Software Engineer at Company A',
      timeline: 'Jan 2016 - Present',
      description: 'Implemented Gamification for system',
    },
    {
      title: 'Fullstack Software Engineer at Company B',
      timeline: 'Feb 2015 - Dec 2015',
      responsibilities: [
        'Worked with a global team of developers and artists for the implementation of new features in Existing Codebase of a Free-to-play MMO',
        'Increased rate of tickets/tasks done by the team up to 300% within first few weeks!',
        'Added Abstractions on Server API to Minimize Duplicate Code'
      ]
    }
  ],
  testimonials: [
    {
      quote: 'Incredibly talented and hardworking. A super friendly guy who is a frequent communicator',
      name: 'Person Name',
      title: 'CEO at Company'
    },
    {
      quote: 'Wow, thank you for this, you probably have the most intuitive explanation for this problem!',
      name: 'Person Name'
    }
  ]
}
