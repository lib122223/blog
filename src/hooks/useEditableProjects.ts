import { useState, useCallback } from 'react'
import { projects as defaultProjects } from '../data/projects'
import type { Project } from '../types'

const STORAGE_KEY = 'portfolio-projects'

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Project[]
  } catch { /* ignore */ }
  return defaultProjects.map((p) => ({ ...p, detail: p.detail ? { ...p.detail } : undefined }))
}

export function useEditableProjects() {
  const [projects, setProjects] = useState<Project[]>(loadProjects)

  const saveProjects = (next: Project[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      alert('保存失败：图片过大，请使用较小的图片或 URL 链接')
    }
  }

  const updateProject = useCallback((id: string, data: Project) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === id ? data : p))
      saveProjects(next)
      return next
    })
  }, [])

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id)
      saveProjects(next)
      return next
    })
  }, [])

  const addProject = useCallback(() => {
    const id = 'project-' + Date.now()
    const newProject: Project = {
      id,
      title: '新项目',
      description: { zh: '', en: '' },
      thumbnail: '',
      techTags: [],
    }
    setProjects((prev) => {
      const next = [...prev, newProject]
      saveProjects(next)
      return next
    })
  }, [])

  const resetProjects = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProjects(defaultProjects.map((p) => ({ ...p, detail: p.detail ? { ...p.detail } : undefined })))
  }, [])

  return { projects, updateProject, deleteProject, addProject, resetProjects }
}
