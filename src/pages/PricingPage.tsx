import { Link } from 'react-router'
import { PageIntro } from '../components/PageIntro.tsx'

type Plan = {
  name: string
  price: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  { name: 'Free', price: '$0', features: ['25 images a month', 'Standard speed', 'Personal use'] },
  {
    name: 'Pro',
    price: '$12',
    popular: true,
    features: ['1,000 images a month', 'Fast generation', '4K upscaling', 'No watermark'],
  },
  { name: 'Studio', price: '$39', features: ['Unlimited images', 'Commercial license', 'Up to 5 teammates', 'Priority support'] },
]

export function PricingPage() {
  return (
    <>
      <title>Pricing — Dreamshot</title>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <PageIntro eyebrow="Pricing" title={<>Pick a plan, <span className="text-gradient">start dreaming</span></>}>
          Start free. Upgrade when you're hooked. Cancel anytime.
        </PageIntro>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-fuchsia-500/20 to-orange-400/5 ring-2 ring-pink-400/60'
                  : 'bg-white/[0.03] ring-1 ring-white/10'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-4">
                <span className="font-display text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-400"> / month</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span aria-hidden="true" className="text-pink-400">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/docs/your-first-image"
                className={`mt-8 rounded-full px-4 py-3 text-center font-semibold ${
                  plan.popular
                    ? 'bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white hover:brightness-110'
                    : 'border border-white/15 text-white hover:bg-white/5'
                }`}
              >
                {plan.price === '$0' ? 'Start for free' : `Get ${plan.name}`}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
