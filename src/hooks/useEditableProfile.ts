import { useState, useCallback } from 'react'
import { profile as defaultProfile } from '../data/profile'
import type { Profile } from '../types'

const STORAGE_KEY = 'portfolio-profile'

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Profile
  } catch { /* ignore */ }
  return { ...defaultProfile }
}

export function useEditableProfile() {
  const [profile, setProfile] = useState<Profile>(loadProfile)

  const updateProfile = useCallback((next: Profile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setProfile(next)
    } catch {
      alert('保存失败：图片过大，请使用较小的图片或 URL 链接')
    }
  }, [])

  const resetProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProfile({ ...defaultProfile })
  }, [])

  return { profile, updateProfile, resetProfile }
}
