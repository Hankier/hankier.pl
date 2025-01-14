import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { formatISO } from 'date-fns'

export async function POST(req: Request) {
  try {
    const jsonData = await req.json()

    // Get Discord webhook URL from site config
    const payload = await getPayload({ config: configPromise })
    const siteConfig = await payload.findGlobal({
      slug: 'site-config',
    })

    const webhookUrl = siteConfig?.discordWebhookUrl

    if (!webhookUrl) {
      return NextResponse.json({ error: 'Discord webhook URL not configured' }, { status: 400 })
    }

    // Convert JSON to markdown
    const markdownFields = Object.entries(jsonData).map(([key, value]) => {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1)
      return `**${formattedKey}:** ${value}`
    })

    // Add datetime
    const now = formatISO(new Date())
    markdownFields.push(`\n**Timestamp:** ${now}`)

    // Join all fields with newlines
    const content = markdownFields.join('\n')

    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    if (!response.ok) {
      throw new Error('Failed to send Discord webhook')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Discord webhook error:', error)
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  }
}
