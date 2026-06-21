// Central content for the site. Keeping copy here keeps the components clean.

export const profile = {
  name: 'Rui Baiao',
  role: 'Engineering Manager',
  location: 'Stockholm, Sweden',
  email: 'rui.palma.baiao@gmail.com',
  languages: ['Portuguese', 'English', 'Swedish', 'Spanish', 'French'],
}

// LinkedIn and Eon Rift URLs are placeholders — swap in the real links.
// GitHub points at the real RPBMedia account.
export const links = {
  email: `mailto:${profile.email}`,
  github: 'https://github.com/RPBMedia',
  linkedin: 'https://www.linkedin.com/in/rui-baiao',
  music: 'https://eonrift.com',
}

export const stats = [
  { value: '15+', label: 'years in engineering & leadership' },
  { value: '~100k', label: 'users on platforms I help run' },
  { value: '100+', label: 'countries served' },
  { value: '3', label: 'cross-functional teams led' },
]

export const leadershipPrinciples = [
  {
    title: 'Fairness & transparency',
    body: 'Clear expectations, honest feedback, and decisions people can actually follow — even the unpopular ones.',
  },
  {
    title: 'Humor under pressure',
    body: 'Teams do their best work when they are not afraid. A bit of levity keeps everyone grounded when delivery gets heavy.',
  },
  {
    title: 'High engineering standards',
    body: 'Quality is a leadership choice. I protect the bar on architecture, review, and craft instead of trading it away under deadline.',
  },
  {
    title: 'Lean, useful process',
    body: 'Just enough process to create flow and clarity — never ceremony for its own sake.',
  },
  {
    title: 'Growing people',
    body: 'Real career conversations, honest coaching, and stretch that is challenging but fair.',
  },
  {
    title: 'Protecting focus',
    body: 'Shielding teams from noise, thrash, and context-switching is half the job. Focus is a resource worth defending.',
  },
  {
    title: 'Tech ↔ product alignment',
    body: 'Connecting architectural decisions to business and product outcomes so engineering effort actually compounds.',
  },
  {
    title: 'High-performing teams',
    body: 'Building groups that own their work, trust each other, and ship — with the autonomy to do it well.',
  },
]

export const aiTools = [
  { name: 'Claude Code', note: 'Agentic coding, refactors, and deep codebase work.' },
  { name: 'OpenAI Codex', note: 'Code generation and task automation.' },
  { name: 'GitHub Copilot', note: 'In-editor assistance and faster iteration.' },
  { name: 'Microsoft 365 Copilot', note: 'Docs, summaries, and knowledge work.' },
  { name: 'Lovable', note: 'Rapid prototyping & product validation.', tag: 'prototyping' },
  { name: 'Agentic workflows', note: 'Multi-step automation across the delivery flow.' },
]

export const aiPractices = [
  'AI-assisted automation',
  'AI-assisted prototyping',
  'Documentation acceleration',
  'Codebase exploration',
  'Test generation',
  'Engineering productivity workflows',
]

export const aiPrinciples = [
  'AI is leverage, not magic.',
  'Human review stays essential.',
  'Strong engineering standards still apply.',
  'Productivity never at the cost of maintainability.',
  'Best used to reduce friction, accelerate learning, and improve flow.',
]

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  points: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Volvo Cars',
    role: 'Engineering Manager',
    period: 'Sept 2023 — Present',
    location: 'Stockholm',
    points: [
      'Lead up to three cross-functional teams — a platform team plus product teams building micro-frontend applications.',
      "Run the senior, self-driven team behind Volvo's Connect web app platform.",
      'The platform lets product teams across Volvo Cars ship micro-frontend applications on shared foundations.',
      '~60,000 retailers and ~40,000 internal users rely on it across more than 100 countries.',
      'Own the orchestration and authorization layer across a React / TypeScript frontend and backend-for-frontend components.',
      'Partner closely with sibling platform teams to keep stability high while delivery stays fast.',
      'Active in leadership initiatives that connect leaders across Volvo Cars.',
    ],
  },
  {
    company: 'Snow Software',
    role: 'Engineering Manager',
    period: 'Sept 2021 — Sept 2023',
    location: 'Stockholm',
    points: [
      'Led multiple cross-functional, frontend-focused teams.',
      'Helped grow a large-scale Software Asset Management platform.',
      'Delivered UI and design-system components used across the product.',
      'Partnered with Product, Scrum Masters, and Engineers on architecture, innovation, and product quality.',
      'Introduced and refined Agile process, OKR planning, and roadmap prioritization.',
      'Recruited, coached, and developed engineers.',
    ],
  },
  {
    company: 'Fortum Sweden',
    role: 'Senior Software Engineer / Team Lead',
    period: 'Dec 2017 — Sept 2021',
    location: 'Stockholm',
    points: [
      'Lead frontend developer, Scrum Master, and recruiter.',
      'Built IoT products across Smart Housing, Electric Vehicles, and hydro energy trading.',
      'Worked primarily in React, React Native, and TypeScript.',
      'Combined hands-on software engineering with team leadership responsibilities.',
    ],
  },
]

export type SkillGroup = { title: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  {
    title: 'Leadership',
    skills: [
      'People management & mentoring',
      'Cross-functional team leadership',
      'Recruitment & onboarding',
      'Career development',
      'Agile methodologies',
      'Product collaboration',
      'Budget management',
      'KPI & OKR definition',
      'Delivery leadership',
      'Stakeholder alignment',
    ],
  },
  {
    title: 'AI & Developer Productivity',
    skills: [
      'Claude Code',
      'OpenAI Codex',
      'GitHub Copilot',
      'Microsoft 365 Copilot',
      'Lovable',
      'Agentic workflows',
      'AI-assisted automation',
      'AI-assisted documentation',
      'AI-assisted prototyping',
      'Codebase exploration',
      'Test generation',
    ],
  },
  {
    title: 'Engineering',
    skills: [
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Node.js / Express',
      'HTML / CSS',
      'AngularJS',
      'iOS Swift',
      'Java',
      'MongoDB',
      'Micro-frontends',
      'Backend-for-frontend',
      'CI/CD collaboration',
      'Grafana',
      'Sentry',
      'Observability & RUM',
    ],
  },
  {
    title: 'Creative',
    skills: [
      'Music production',
      'Sound design',
      'Film-making',
      'Photography editing',
      'Travel photography',
    ],
  },
]

export type TimelineItem = {
  period: string
  role: string
  company: string
  location: string
  note?: string
  kind: 'work' | 'education'
}

export const timeline: TimelineItem[] = [
  {
    period: '2023 — Present',
    role: 'Engineering Manager',
    company: 'Volvo Cars',
    location: 'Stockholm',
    note: "Leading the platform behind Volvo's Connect web apps.",
    kind: 'work',
  },
  {
    period: '2021 — 2023',
    role: 'Engineering Manager',
    company: 'Snow Software',
    location: 'Stockholm',
    note: 'Frontend-focused teams on a Software Asset Management platform.',
    kind: 'work',
  },
  {
    period: '2017 — 2021',
    role: 'Senior Software Engineer / Team Lead',
    company: 'Fortum Sweden',
    location: 'Stockholm',
    note: 'IoT for Smart Housing, EVs, and hydro energy trading.',
    kind: 'work',
  },
  {
    period: '2015 — 2017',
    role: 'Senior Software Developer',
    company: 'Frost',
    location: 'Stockholm',
    note: 'Startup environment — Node.js, Swift, AngularJS, React, React Native.',
    kind: 'work',
  },
  {
    period: '2014',
    role: 'Volunteer',
    company: 'Children & Women Promoting Center',
    location: 'Sauraha, Nepal',
    note: "Education and housekeeping support at a children's home.",
    kind: 'work',
  },
  {
    period: '2013 — 2014',
    role: 'Software Engineer',
    company: 'Safira',
    location: 'Lisbon',
    note: 'CRM web & mobile — Java, IBM BPM, Worklight, Sencha Touch.',
    kind: 'work',
  },
  {
    period: '2012 — 2013',
    role: 'Motion Designer / Video Animator',
    company: 'Freelance',
    location: 'Lisbon',
    note: 'After Effects, Premiere, Cinema 4D.',
    kind: 'work',
  },
  {
    period: '2011 — 2012',
    role: 'Software Developer',
    company: 'KCSIT France',
    location: 'Paris',
    note: 'Frontend consulting in nuclear energy and Smart TV interfaces.',
    kind: 'work',
  },
  {
    period: '2009 — 2010',
    role: 'Software Developer',
    company: 'Novabase',
    location: 'Lisbon',
    note: 'Telecom prototype later sold to Vodafone Portugal; social TV tools; Social Security of Portugal backend.',
    kind: 'work',
  },
  {
    period: '2003 — 2009',
    role: 'BSc, Computer Engineering',
    company: 'Universidade Nova de Lisboa (FCT)',
    location: 'Lisbon',
    kind: 'education',
  },
  {
    period: '2012 — 2013',
    role: 'Post-grad, Audiovisual & Multimedia',
    company: 'Escola Superior de Comunicação Social',
    location: 'Lisbon',
    kind: 'education',
  },
]

export const creativeTags = [
  'Eon Rift — music',
  'Photography',
  'Guitar',
  'Travel',
  'History',
  'Finance',
  'Self-development',
  'Gaming',
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'ai', label: 'AI Engineering' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'creative', label: 'Creative' },
  { id: 'contact', label: 'Contact' },
]
