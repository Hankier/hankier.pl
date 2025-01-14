import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Config } from '@/payload-types'

export async function POST(request: Request) {
  try {
    const { name, email, groups } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!groups?.length) {
      return NextResponse.json({ error: 'At least one group is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const siteConfig = (await payload.findGlobal({
      slug: 'site-config',
    })) as Config['globals']['site-config']

    if (!siteConfig?.mailerLiteApiKey) {
      return NextResponse.json({ error: 'MailerLite API key is not configured' }, { status: 500 })
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${siteConfig.mailerLiteApiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name,
        },
        groups,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.message }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 })
  }
}
