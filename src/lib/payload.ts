const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined)

if (!CMS_URL) {
  throw new Error('NEXT_PUBLIC_CMS_URL (or NEXT_PUBLIC_SERVER_URL) must be set')
}

type Media = {
  url?: string
  alt?: string
  width?: number
  height?: number
}

type Product = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  image?: Media
  active: boolean
  order?: number
}

export type SiteSettings = {
  logo?: Media
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: Media
  ctaText?: string
  ctaLink?: string
  footerText?: string
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${CMS_URL}/api/products?where[active][equals]=true&sort=order&depth=1`,
    {
      next: { revalidate: 60 },
    },
  )

  if (!res.ok) {
    throw new Error('Erreur API Payload (products)')
  }

  const data = await res.json()
  return data.docs || []
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const res = await fetch(`${CMS_URL}/api/globals/site-settings?depth=1`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error('Erreur API Payload (site-settings)')
  }

  return res.json()
}
