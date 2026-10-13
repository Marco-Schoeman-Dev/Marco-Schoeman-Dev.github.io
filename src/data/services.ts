export interface Service {
  id: string
  title: string
  kana: string
  summary: string
  /** Tools and skills used for this service */
  stack: string[]
}

// Every skill from the previous Skills section lives in exactly one stack below.
export const services: Service[] = [
  {
    id: 'websites',
    title: 'Websites',
    kana: 'ウェブサイト',
    summary:
      'Marketing sites and web apps for businesses, designed, built and shipped. Fast on a phone, easy to find on Google, and secure from day one.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs', 'PostgreSQL', 'Git', 'Docker'],
  },
  {
    id: 'automations',
    title: 'AI Automations',
    kana: '自動化',
    summary:
      'Lead pipelines, document processing, chat bots and internal tools that run themselves. If a task repeats, it gets automated.',
    stack: ['n8n', 'Make (Integromat)', 'Claude API'],
  },
  {
    id: 'pentesting',
    title: 'Penetration Testing',
    kana: 'ペネトレーション',
    summary:
      'Web app and network testing from an attacker’s point of view, with a clear report of what I found and how to fix it.',
    stack: ['Web App Pentesting', 'Network Pentesting', 'Vulnerability Research', 'Bug Bounty', 'Burp Suite', 'Metasploit'],
  },
  {
    id: 'red-team',
    title: 'Red Team Engagements',
    kana: 'レッドチーム',
    summary:
      'Full-scope adversary simulation: Active Directory attacks, phishing and physical intrusion, run with tight OPSEC and agreed rules of engagement.',
    stack: ['Red Team Operations', 'Active Directory', 'BloodHound'],
  },
  {
    id: 'osint',
    title: 'OSINT',
    kana: 'インテリジェンス',
    summary:
      'Open-source intelligence on people, companies and infrastructure, mapped into an attack surface you can act on.',
    stack: ['OSINT'],
  },
]
