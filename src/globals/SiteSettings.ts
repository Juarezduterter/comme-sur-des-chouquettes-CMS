import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Titre hero',
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Sous-titre hero',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: "Texte de l'appel à l'action",
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: "Lien de l'appel à l'action",
    },
    {
      name: 'footerText',
      type: 'text',
      label: 'Texte du footer',
    },
  ],
}
