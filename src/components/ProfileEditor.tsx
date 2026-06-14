import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Profile } from '../types'

interface Props {
  profile: Profile
  onSave: (p: Profile) => void
  onReset: () => void
  onClose: () => void
}

export default function ProfileEditor({ profile, onSave, onReset, onClose }: Props) {
  const [form, setForm] = useState<Profile>({ ...profile })

  useEffect(() => {
    setForm({ ...profile })
  }, [profile])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (key: keyof Profile, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave(form)
    onClose()
  }

  const handleReset = () => {
    onReset()
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-bg-base/80 flex items-center justify-center p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-bg-elevated rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-lg font-semibold text-text-primary">
              编辑个人信息
            </h2>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xl leading-none">
              &#x2715;
            </button>
          </div>

          <div className="space-y-4">
            <Field label="姓名" value={form.name} onChange={(v) => set('name', v)} />
            <ImageField label="头像" value={form.avatar} onChange={(v) => set('avatar', v)} />

            <div className="grid grid-cols-2 gap-3">
              <Field label="职称（中文）" value={form.title.zh} onChange={(v) => set('title', { ...form.title, zh: v })} />
              <Field label="Title (EN)" value={form.title.en} onChange={(v) => set('title', { ...form.title, en: v })} />
            </div>

            <div className="space-y-3">
              <TextArea label="简介（中文）" value={form.bio.zh} onChange={(v) => set('bio', { ...form.bio, zh: v })} />
              <TextArea label="Bio (EN)" value={form.bio.en} onChange={(v) => set('bio', { ...form.bio, en: v })} />
            </div>

            <Field label="邮箱" value={form.email} onChange={(v) => set('email', v)} />
            <Field label="GitHub 链接" value={form.socialLinks.github ?? ''} onChange={(v) => set('socialLinks', { ...form.socialLinks, github: v || undefined })} />
            <Field label="LinkedIn 链接" value={form.socialLinks.linkedin ?? ''} onChange={(v) => set('socialLinks', { ...form.socialLinks, linkedin: v || undefined })} />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 py-2 rounded-lg bg-accent text-bg-base font-medium text-sm hover:opacity-90 transition-opacity"
            >
              保存
            </button>
            <button
              onClick={handleReset}
              className="py-2 px-4 rounded-lg border border-bg-divider text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              恢复默认
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-text-muted mb-1 block">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg-surface border border-bg-divider rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
      />
    </label>
  )
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-text-muted mb-1 block">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-bg-surface border border-bg-divider rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
      />
    </label>
  )
}

function compressImage(file: File, maxW: number, maxH: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        let w = img.width
        let h = img.height
        if (w > maxW) { h *= maxW / w; w = maxW }
        if (h > maxH) { w *= maxH / h; h = maxH }
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(w)
        canvas.height = Math.round(h)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

function ImageField({ label, value, onChange, maxW = 400, maxH = 400 }: { label: string; value: string; onChange: (v: string) => void; maxW?: number; maxH?: number }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const compressed = await compressImage(file, maxW, maxH, 0.75)
    onChange(compressed)
  }

  return (
    <div className="space-y-1">
      <span className="text-xs text-text-muted block">{label}</span>
      {value && (
        <img src={value} alt="" className="w-16 h-16 rounded-lg object-cover border border-bg-divider" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block w-full text-sm text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-bg-surface file:text-text-primary hover:file:bg-bg-divider file:cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="或输入图片 URL"
        className="w-full bg-bg-surface border border-bg-divider rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}
