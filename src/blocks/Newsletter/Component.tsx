'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type FormData = {
  name: string
  email: string
  terms: boolean
}

type NewsletterBlockProps = {
  title: string
  subtitle?: SerializedEditorState
  termsText: SerializedEditorState
  buttonText: string
  successTitle: string
  successMessage: string
}

export const NewsletterBlock: React.FC<NewsletterBlockProps> = ({
  title,
  subtitle,
  termsText,
  buttonText = 'Subscribe',
  successTitle,
  successMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: FormData) => {
    if (!data.terms) {
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (error) {
      console.error('Newsletter signup failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="relative container mx-auto px-4 py-12">
        <div className="w-full rounded-xl border border-amber-500/10 relative overflow-hidden bg-black/40">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
          </div>

          <div className="relative p-8 md:p-12 lg:p-16">
            <h3 className="text-4xl font-bold text-white">{successTitle}</h3>
            <p className="mt-4 text-lg text-zinc-400/80">{successMessage}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative container mx-auto px-4 py-12">
      <div className="w-full rounded-xl border border-amber-500/10 relative overflow-hidden bg-black/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        <div className="relative p-8 md:p-12 lg:p-16 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">{title}</h2>
              {subtitle && (
                <div className="text-lg text-zinc-400/80">
                  <RichText data={subtitle} enableGutter={false} />
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-400">
                    Imię
                  </Label>
                  <Input
                    id="name"
                    placeholder="Twoje imię"
                    className="bg-black/50 border-amber-500/20 focus:border-amber-500 text-zinc-100"
                    {...register('name', { required: 'Imię jest wymagane' })}
                  />
                  {errors.name && <p className="text-rose-700 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Twoj email"
                    className="bg-black/50 border-amber-500/20 focus:border-amber-500 text-zinc-100"
                    {...register('email', {
                      required: 'Email jest wymagany',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Nieprawidłowy adres email',
                      },
                    })}
                  />
                  {errors.email && <p className="text-rose-700 text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="border-zinc-800 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  {...register('terms', { required: 'Musisz zaakceptować zasady' })}
                  onCheckedChange={(checked) => {
                    setValue('terms', checked as boolean, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                />
                <Label htmlFor="terms" className="text-sm text-zinc-400">
                  <RichText data={termsText} enableGutter={false} />
                </Label>
                {errors.terms && <p className="text-rose-700 text-xs">{errors.terms.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading || Object.keys(errors).length > 0}
                className="w-full sm:w-auto px-8 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold"
              >
                {isLoading ? 'Subscribing...' : buttonText}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
