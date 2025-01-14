import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'mailerLiteApiKey',
      label: 'MailerLite API Key',
      type: 'text',
      required: true,
      admin: {
        description: 'Your MailerLite API key',
      },
    },
    {
      name: 'discordWebhookUrl',
      label: 'Discord Webhook Notification URL',
      type: 'text',
      required: false,
      admin: {
        description: 'Discord webhook URL for notifications',
      },
    },
  ],
  typescript: {
    interface: 'SiteConfig',
  },
}
