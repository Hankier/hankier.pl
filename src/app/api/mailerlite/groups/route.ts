import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const mailerLite = await payload.findGlobal({
      slug: 'mailer-lite',
    })

    if (!mailerLite?.apiKey) {
      return NextResponse.json({ error: 'MailerLite API key is not configured' }, { status: 500 })
    }

    const response = await fetch('https://connect.mailerlite.com/api/groups', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${mailerLite.apiKey}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.message }, { status: response.status })
    }

    const { data } = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch MailerLite groups:', error)
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 })
  }
}
