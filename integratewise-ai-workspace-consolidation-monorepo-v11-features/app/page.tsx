import { redirect } from 'next/navigation'

/**
 * Root page redirect
 * 
 * Marketing site has moved to Webflow.
 * This page redirects to the IntegrateWise OS app.
 */
export default function Home() {
  // Redirect to the main app dashboard
  redirect('/(app)/dashboard')
}
