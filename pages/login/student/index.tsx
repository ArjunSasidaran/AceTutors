import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'

export default function index() {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <div>Student login</div>
    </ClerkProvider>
  )
}
