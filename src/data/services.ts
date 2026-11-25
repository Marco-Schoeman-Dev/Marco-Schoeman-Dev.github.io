export interface Service {
  id: string
  title: string
  summary: string
  /** Tools and skills used for this service */
  stack: string[]
}

export const services: Service[] = [
  {
    id: 'websites',
    title: 'Websites',
    summary:
      'Marketing sites and web apps for businesses, designed, built and shipped. Fast on a phone, easy to find on Google, and secure from day one.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs', 'PostgreSQL', 'Git', 'Docker'],
  },
  {
    id: 'automations',
    title: 'AI Automations',
    summary:
      'Lead pipelines, document processing, chat bots and internal tools that run themselves. If a task repeats, it gets automated.',
    stack: ['n8n', 'Make (Integromat)', 'Claude API'],
  },
  {
    id: 'pentesting',
    title: 'Penetration Testing',
    summary:
      'Web app and network testing from an attacker’s point of view, with a clear report of what I found and how to fix it.',
    stack: ['Web App Pentesting', 'Network Pentesting', 'Vulnerability Research', 'Bug Bounty', 'Burp Suite', 'Metasploit'],
  },
  {
    id: 'red-team',
    title: 'Red Team (Active Directory)',
    summary:
      'Adversary simulation against your Active Directory environment, run under agreed rules of engagement, with a report your IT team can act on.',
    stack: ['Red Team Operations', 'Active Directory', 'BloodHound'],
  },
  {
    id: 'osint',
    title: 'OSINT',
    summary:
      'Open-source intelligence on your company and infrastructure: what an outsider can find about you, and what to do about it.',
    stack: ['OSINT', 'Attack Surface Mapping'],
  },
]
