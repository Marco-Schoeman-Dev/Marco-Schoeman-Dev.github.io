export const methodArt = {
  image: 'method-operative' as const,
  alt: 'Illustrated Marco in a black jacket and headphones, hands in pockets on a rooftop as the sun sets over a neon city.',
  kana: 'オペレーター',
}

export interface MethodStep {
  id: string
  title: string
  kana: string
  body: string
}

export const method: MethodStep[] = [
  {
    id: 'listen',
    title: 'Listen',
    kana: '聞く',
    body: 'A quick call or a few DMs. What you are building, who it is for, what success looks like, and what keeps you up at night.',
  },
  {
    id: 'design',
    title: 'Design',
    kana: 'デザイン',
    body: 'A clear plan and a look that fits your brand. You see it and sign off before a single line of production code is written.',
  },
  {
    id: 'build',
    title: 'Build',
    kana: '構築',
    body: 'Clean, fast, tested code. Built by someone who breaks into systems for a living, so security is part of the build, not an afterthought.',
  },
  {
    id: 'ship',
    title: 'Ship',
    kana: '公開',
    body: 'Launched, monitored and handed over properly, with docs and support so you are never left guessing.',
  },
]
