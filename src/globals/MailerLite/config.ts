import type { GlobalConfig } from 'payload'

export const MailerLite: GlobalConfig = {
  slug: 'mailer-lite',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'apiKey',
      type: 'text',
      required: true,
      admin: {
        description: 'Your MailerLite API key',
      },
    },
  ],
  typescript: {
    interface: 'MailerLiteConfig',
  },
}
