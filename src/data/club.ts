// ─── The Founders Club ────────────────────────────────────────────────────────
// Brand name is always "The Founders Club" (no apostrophe).
// Never link to the payment platform: approved members get a private link.

export const club = {
  name: 'The Founders Club',
  lead: 'A private, application-only peer network for business owners, C-suite and content creators. Global, small, and short on motivational quotes.',
  reviewNote: 'Every application is reviewed personally by Marco.',
  audience: ['Business owners', 'C-suite', 'Content creators'],
}

export interface Benefit {
  id: string
  title: string
  body: string
}

export const benefits: Benefit[] = [
  {
    id: 'weekly-calls',
    title: 'Weekly calls',
    body: 'One call a week with the group. Real problems, real numbers, no slides.',
  },
  {
    id: 'one-on-one',
    title: 'One-on-one brainstorms',
    body: 'Time on your business specifically. Bring the problem you have been politely avoiding.',
  },
  {
    id: 'members-space',
    title: 'Members-only chat and voice',
    body: 'A private space with like-minded founders who answer questions instead of selling courses.',
  },
  {
    id: 'events',
    title: 'Paid virtual events',
    body: 'Access to paid virtual events with guest speakers who have done the thing, not just posted about it.',
  },
]

export const pricing = {
  founding: { amount: '$30', label: 'per month', note: 'First 20 founding members' },
  standard: { amount: '$40', label: 'per month', note: 'Everyone after that' },
  currency: 'USD',
  terms: 'Monthly. Cancel anytime.',
}

export const steps = [
  { id: 'apply', title: 'Apply', body: 'Fill in the form below. It takes a few minutes and asks about your business, not your star sign.' },
  { id: 'review', title: 'Review', body: 'Every application is reviewed personally by Marco. No bots, no assistant, no lottery.' },
  { id: 'join', title: 'Join', body: 'If it is a fit, you get a private payment link from Marco. Pay, and you are in.' },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Who is it for?',
    a: 'Business owners, C-suite and content creators who are building something real, anywhere in the world. If you are still deciding whether to start, come back when you have.',
  },
  {
    q: 'How does approval work?',
    a: 'You apply with the form on this page. Marco reads every application personally. If it is a fit, you get a private payment link from him. There is no public checkout.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. Membership is monthly and you can cancel anytime. No contracts, no exit interview.',
  },
]
