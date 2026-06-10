'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle } from '@phosphor-icons/react'

interface ToastProps {
  message: string
  variant: 'success' | 'error'
  onDismiss: () => void
}

/**
 * Auto-dismissing toast notification.
 * Dismisses after 4 seconds via onDismiss callback.
 * Uses role="status" + aria-live="polite" for screen reader support.
 */
export function Toast({ message, variant, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed bottom-6 right-6 z-50 flex items-center gap-3',
        "px-4 py-3 rounded-lg shadow-lg text-sm font-medium font-['DM_Sans']",
        'animate-in slide-in-from-bottom-2 fade-in duration-200',
        variant === 'success'
          ? 'bg-[#06211A] text-[#DBFF66]'
          : 'bg-red-900 text-red-100',
      ].join(' ')}
    >
      {variant === 'success' ? (
        <CheckCircle size={16} weight="bold" className="shrink-0" aria-hidden="true" />
      ) : (
        <XCircle size={16} weight="bold" className="shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  )
}
