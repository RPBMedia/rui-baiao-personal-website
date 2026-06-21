import { useEffect, useRef, useState } from 'react'
import { Mail, X } from './icons'

type FormState = 'idle' | 'sending' | 'success' | 'error'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: Props) {
  const [senderEmail, setSenderEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => firstFieldRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const reset = () => {
    setSenderEmail('')
    setTitle('')
    setDescription('')
    setFormState('idle')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/rui.palma.baiao@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: senderEmail,
          _subject: title,
          message: description,
          _captcha: 'false',
          _template: 'basic',
        }),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/85 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden
      />

      {/* Modal card */}
      <div className="card-3d relative w-full max-w-lg rounded-3xl p-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent/30 hover:text-paper"
          aria-label="Close"
        >
          <X width={16} height={16} />
        </button>

        {formState === 'success' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-accent/30 bg-accent/10">
              <Mail width={26} height={26} className="text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-paper">Message sent!</h3>
            <p className="mt-2 text-muted">I'll get back to you as soon as possible.</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent/30"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Get in touch</p>
              <h3 id="contact-modal-title" className="mt-3 text-2xl font-semibold text-paper">
                Send me a message
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                I'll reply from{' '}
                <span className="text-silver">rui.palma.baiao@gmail.com</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="sender-email" className="mb-1.5 block text-sm font-medium text-paper">
                  Your email
                </label>
                <input
                  ref={firstFieldRef}
                  id="sender-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted/50 outline-none transition-colors focus:border-accent/40 focus:bg-accent/[0.04]"
                />
              </div>

              <div>
                <label htmlFor="msg-subject" className="mb-1.5 block text-sm font-medium text-paper">
                  Subject
                </label>
                <input
                  id="msg-subject"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted/50 outline-none transition-colors focus:border-accent/40 focus:bg-accent/[0.04]"
                />
              </div>

              <div>
                <label htmlFor="msg-body" className="mb-1.5 block text-sm font-medium text-paper">
                  Message
                </label>
                <textarea
                  id="msg-body"
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell me more…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted/50 outline-none transition-colors focus:border-accent/40 focus:bg-accent/[0.04]"
                />
              </div>

              {formState === 'error' && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again or email me directly at rui.palma.baiao@gmail.com.
                </p>
              )}

              <button
                type="submit"
                disabled={formState === 'sending'}
                className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft disabled:opacity-60"
              >
                {formState === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
