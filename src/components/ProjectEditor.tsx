import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../types'

interface Props {
  projects: Project[]
  onUpdate: (id: string, p: Project) => void
  onDelete: (id: string) => void
  onAdd: () => void
  onReset: () => void
  onClose: () => void
}

export default function ProjectEditor({ projects, onUpdate, onDelete, onAdd, onReset, onClose }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingId) setEditingId(null)
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, editingId])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-bg-base/80 flex items-center justify-center p-5"
        onClick={() => { if (editingId) setEditingId(null); else onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-bg-elevated rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-lg font-semibold text-text-primary">
              编辑项目
            </h2>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xl leading-none">
              &#x2715;
            </button>
          </div>

          <div className="space-y-2 mb-6">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-center justify-between py-2 border-b border-bg-divider">
                  <span className="text-sm text-text-primary truncate mr-2">{p.title}</span>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setEditingId(editingId === p.id ? null : p.id)}
                      className="text-xs text-accent hover:underline"
                    >
                      {editingId === p.id ? '收起' : '编辑'}
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      删除
                    </button>
                  </div>
                </div>

                {editingId === p.id && (
                  <ProjectForm
                    project={p}
                    onSave={(data) => { onUpdate(p.id, data); setEditingId(null) }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAdd}
              className="flex-1 py-2 rounded-lg border border-accent text-accent text-sm hover:bg-accent hover:text-bg-base transition-colors"
            >
              + 新增项目
            </button>
            <button
              onClick={onReset}
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

function ProjectForm({ project, onSave }: { project: Project; onSave: (p: Project) => void }) {
  const [form, setForm] = useState<Project>(() => {
    const copy = JSON.parse(JSON.stringify(project))
    if (!copy.detail) {
      copy.detail = {
        background: { zh: '', en: '' },
        approach: { zh: '', en: '' },
        result: { zh: '', en: '' },
      }
    }
    return copy
  })

  const set = (key: string, value: unknown) => {
    setForm((prev) => {
      const keys = key.split('.')
      const next = { ...prev }
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]] as Record<string, unknown>
      }
      target[keys[keys.length - 1]] = value
      return next
    })
  }

  const get = (key: string): string => {
    const keys = key.split('.')
    let val: unknown = form
    for (const k of keys) {
      val = (val as Record<string, unknown>)[k]
    }
    return (val as string) ?? ''
  }

  return (
    <div className="bg-bg-surface rounded-lg p-4 mt-2 mb-2 space-y-3">
      <Field label="项目名称" value={get('title')} onChange={(v) => set('title', v)} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="描述（中文）" value={get('description.zh')} onChange={(v) => set('description.zh', v)} />
        <Field label="Description (EN)" value={get('description.en')} onChange={(v) => set('description.en', v)} />
      </div>
      <ImageField label="截图" value={get('thumbnail')} onChange={(v) => set('thumbnail', v)} />
      <label className="block">
        <span className="text-xs text-text-muted mb-1 block">技术标签（逗号分隔）</span>
        <input
          type="text"
          value={Array.isArray(form.techTags) ? form.techTags.join(', ') : ''}
          onChange={(e) => {
            const tags = e.target.value
              ? e.target.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
              : []
            set('techTags', tags)
          }}
          className="w-full bg-bg-base border border-bg-divider rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
        />
      </label>
      <Field label="源码链接" value={get('sourceUrl')} onChange={(v) => set('sourceUrl', v || undefined)} />
      <Field label="演示链接" value={get('demoUrl')} onChange={(v) => set('demoUrl', v || undefined)} />

      <div className="border-t border-bg-divider pt-3">
        <span className="text-xs text-text-muted mb-2 block">详情（弹窗内容）</span>
        <div className="grid grid-cols-2 gap-2">
          <Field label="背景（中文）" value={get('detail.background.zh')} onChange={(v) => set('detail.background.zh', v)} />
          <Field label="Background (EN)" value={get('detail.background.en')} onChange={(v) => set('detail.background.en', v)} />
          <Field label="方案（中文）" value={get('detail.approach.zh')} onChange={(v) => set('detail.approach.zh', v)} />
          <Field label="Approach (EN)" value={get('detail.approach.en')} onChange={(v) => set('detail.approach.en', v)} />
          <Field label="成果（中文）" value={get('detail.result.zh')} onChange={(v) => set('detail.result.zh', v)} />
          <Field label="Result (EN)" value={get('detail.result.en')} onChange={(v) => set('detail.result.en', v)} />
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        className="w-full py-2 rounded-lg bg-accent text-bg-base font-medium text-sm hover:opacity-90 transition-opacity"
      >
        保存项目
      </button>
    </div>
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
        className="w-full bg-bg-base border border-bg-divider rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
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

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const compressed = await compressImage(file, 1600, 1200, 0.8)
    onChange(compressed)
  }

  return (
    <div className="space-y-1">
      <span className="text-xs text-text-muted block">{label}</span>
      {value && (
        <img src={value} alt="" className="w-24 h-auto rounded-lg object-cover border border-bg-divider" />
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
        className="w-full bg-bg-base border border-bg-divider rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}
