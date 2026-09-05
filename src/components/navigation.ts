export type NavItem = {
  to: string
  label: string
}

export const navItems: NavItem[] = [
  { to: '/create', label: 'Create' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
]
