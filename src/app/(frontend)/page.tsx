import Image from 'next/image'
import Link from 'next/link'

import { getProducts, getSiteSettings } from '@/lib/payload'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)

export default async function HomePage() {
  const [settings, products] = await Promise.all([getSiteSettings(), getProducts()])

  return (
    <main className="bg-gradient-to-b from-amber-50 via-white to-white text-slate-900">
      <Hero
        title={settings?.heroTitle}
        subtitle={settings?.heroSubtitle}
        ctaText={settings?.ctaText}
        ctaLink={settings?.ctaLink}
        heroImage={settings?.heroImage}
        logo={settings?.logo}
      />

      <section className="mx-auto max-w-6xl px-6 py-16" id="products">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-600">Notre sélection</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Les chouquettes maison</h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Une carte courte, des produits frais, le tout piloté depuis Payload en quelques clics.
            </p>
          </div>
          <div className="rounded-full bg-white/70 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:shadow-lg hover:ring-amber-100"
            >
              {product.image?.url && (
                <div className="relative aspect-[4/3] overflow-hidden bg-amber-50">
                  <Image
                    src={product.image.url}
                    alt={product.image.alt || product.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                </div>
              )}

              <div className="flex flex-col gap-3 px-5 pb-6 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-600">
              Aucun produit actif pour le moment. Ajoutez vos premières chouquettes dans Payload →
              Products.
            </div>
          )}
        </div>
      </section>

      {settings?.footerText && (
        <footer className="border-t border-slate-100 bg-white py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 text-sm text-slate-600">
            <span>{settings.footerText}</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              Contenu issu de Payload CMS
            </span>
          </div>
        </footer>
      )}
    </main>
  )
}

type Media = {
  url?: string
  alt?: string
}

type HeroProps = {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  heroImage?: Media
  logo?: Media
}

function Hero({ title, subtitle, ctaText, ctaLink, heroImage, logo }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-white to-amber-50" />
      {heroImage?.url && (
        <Image
          src={heroImage.url}
          alt={heroImage.alt || 'Hero'}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
      )}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-20 md:flex-row md:items-center md:pt-24">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            {logo?.url && (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                width={48}
                height={48}
                className="rounded-lg border border-amber-200 bg-white p-2 shadow-sm"
              />
            )}
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 shadow-sm ring-1 ring-amber-200">
              comme sur des chouquettes
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              {title || 'Un onepage piloté par Payload'}
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              {subtitle ||
                'Ajoutez vos produits, médias et visuels dans Payload et cette page se met à jour automatiquement. Simple, net, gourmand.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={ctaLink || '#products'}
              className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200 transition hover:-translate-y-0.5 hover:bg-amber-700"
            >
              {ctaText || 'Voir les produits'}
            </Link>
            <span className="text-sm text-slate-600">
              Médias gérés via la collection <strong>media</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
