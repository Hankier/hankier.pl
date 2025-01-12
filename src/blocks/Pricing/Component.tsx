'use client'
import React, { useState } from 'react'
import { CheckIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

type PriceCard = {
  title: string
  monthlyPrice: number
  yearlyPrice: number
  subtitle: string
  isPopular: boolean
  features: { feature: string }[]
  buttonText: string
  buttonLink: string
}

type Props = {
  title: string
  subtitle: string
  yearlyDiscount: number
  priceCards: PriceCard[]
}

export const PricingBlock: React.FC<Props> = ({ title, subtitle, yearlyDiscount, priceCards }) => {
  const [isYearly, setIsYearly] = useState(false)

  // Calculate grid columns based on number of cards
  const gridCols =
    {
      1: 'grid-cols-1 max-w-md mx-auto',
      2: 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto',
      3: 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[Math.min(priceCards.length, 4)] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return (
    <div className="container py-24 lg:py-32">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {title}
        </h2>
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex justify-center items-center mb-12">
        <Label htmlFor="payment-schedule" className="me-3">
          Monthly
        </Label>
        <Switch id="payment-schedule" checked={isYearly} onCheckedChange={setIsYearly} />
        <Label htmlFor="payment-schedule" className="relative ms-3">
          Annual
          <span className="absolute -top-10 start-auto -end-28">
            <Badge className="mt-3 uppercase">Save up to {yearlyDiscount}%</Badge>
          </span>
        </Label>
      </div>

      <div className={`grid ${gridCols} gap-6 lg:items-center`}>
        {priceCards.map((card, index) => (
          <Card
            key={index}
            className={`transition-all duration-200 ${
              card.isPopular ? 'border-primary scale-105 shadow-lg' : ''
            }`}
          >
            <CardHeader className="text-center pb-2">
              {card.isPopular && (
                <Badge className="uppercase w-max self-center mb-3">Most popular</Badge>
              )}
              <CardTitle className="mb-7">{card.title}</CardTitle>
              <span className="font-bold text-5xl">
                £{isYearly ? card.yearlyPrice : card.monthlyPrice}
              </span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              {card.subtitle}
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                {card.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex space-x-2">
                    <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                    <span className="text-muted-foreground">{feature.feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={card.isPopular ? 'default' : 'outline'} asChild>
                <a href={card.buttonLink}>{card.buttonText}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
