'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type FormData = {
  name: string
  email: string
  comment: string
}

type Props = {
  postId: number
  onSuccess?: () => void
}

export const CommentForm: React.FC<Props> = ({ postId, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          post: postId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit comment')
      }

      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div>
        <textarea
          placeholder="Your comment"
          className="w-full p-2 border rounded"
          rows={4}
          {...register('comment', { required: 'Comment is required' })}
        />
        {errors.comment && <span className="text-red-500 text-sm">{errors.comment.message}</span>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </Button>
    </form>
  )
}
