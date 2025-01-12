import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { CommentForm } from './CommentForm'

export const Comments = async ({ postId }: { postId: number }) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      post: {
        equals: postId,
      },
      approved: {
        equals: true,
      },
    },
  })

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      <div className="mb-8">
        <Suspense fallback={<div>Loading form...</div>}>
          <CommentForm postId={postId} />
        </Suspense>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <h3 className="font-semibold">{comment.name}</h3>
            <p className="text-gray-600 text-sm">{comment.email}</p>
            <p className="mt-2">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
