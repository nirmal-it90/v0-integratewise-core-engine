'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type OnboardingProfile = 'basic' | 'standard' | 'comprehensive'
export type UserStatus = 'unauthenticated' | 'authenticated' | 'onboarding' | 'completed'

export interface UserState {
  id?: string
  email?: string
  fullName?: string
  status: UserStatus
  onboardingProfile?: OnboardingProfile
  onboardingCompleted: boolean
  workspaceId?: string
  apiKey?: string
}

interface UserContextType {
  user: UserState
  setUser: (user: UserState) => void
  login: (email: string, fullName: string) => void
  logout: () => void
  startOnboarding: (profile: OnboardingProfile) => void
  completeOnboarding: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>({
    status: 'unauthenticated',
    onboardingCompleted: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user_state')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch (e) {
        console.error('[v0] Failed to parse user state:', e)
      }
    }
    setIsLoading(false)
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('user_state', JSON.stringify(user))
  }, [user])

  const login = (email: string, fullName: string) => {
    const newUser: UserState = {
      id: `user_${Date.now()}`,
      email,
      fullName,
      status: 'authenticated',
      onboardingCompleted: false,
    }
    setUser(newUser)
  }

  const logout = () => {
    setUser({
      status: 'unauthenticated',
      onboardingCompleted: false,
    })
    localStorage.removeItem('user_state')
  }

  const startOnboarding = (profile: OnboardingProfile) => {
    setUser((prev) => ({
      ...prev,
      status: 'onboarding',
      onboardingProfile: profile,
    }))
  }

  const completeOnboarding = () => {
    setUser((prev) => ({
      ...prev,
      status: 'completed',
      onboardingCompleted: true,
      workspaceId: `ws_${Date.now()}`,
      apiKey: `sk_${Math.random().toString(36).substring(7)}`,
    }))
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, startOnboarding, completeOnboarding, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
