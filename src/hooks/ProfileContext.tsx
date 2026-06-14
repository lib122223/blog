import { createContext, useContext, type ReactNode } from 'react'
import type { Profile } from '../types'
import { useEditableProfile } from './useEditableProfile'

interface Ctx {
  profile: Profile
  updateProfile: (p: Profile) => void
  resetProfile: () => void
}

const ProfileCtx = createContext<Ctx | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const value = useEditableProfile()
  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>
}

export function useProfile() {
  const ctx = useContext(ProfileCtx)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
