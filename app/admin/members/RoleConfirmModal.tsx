'use client'

import { useRef, useEffect } from 'react'

interface RoleConfirmModalProps {
  memberName: string
  newRole: string
  onConfirm: () => void
  onCancel: () => void
}

export function RoleConfirmModal({
  memberName,
  newRole,
  onConfirm,
  onCancel,
}: RoleConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
    return () => {
      dialogRef.current?.close()
    }
  }, [])

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    // Only close if clicking the backdrop (the dialog element itself, not its children)
    if (e.target === dialogRef.current) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onCancel()
      }}
      className="rounded-lg p-0 border border-[#06211A]/15 shadow-xl w-full max-w-md backdrop:bg-black/40"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="p-6">
        <h2
          id="confirm-modal-title"
          className="text-base font-semibold text-[#06211A] font-['DM_Sans'] mb-2"
        >
          Confirm role change
        </h2>
        <p className="text-sm text-[#06211A]/70 font-['DM_Sans'] mb-6">
          You are about to assign{' '}
          <span className="font-medium text-[#06211A]">{memberName}</span> the role of{' '}
          <span className="font-medium text-[#06211A]">
            {newRole.replace(/_/g, ' ')}
          </span>
          . This grants them access to the admin portal.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={[
              'px-4 py-2 text-sm font-medium rounded font-[\'DM_Sans\']',
              'text-[#06211A]/70 hover:text-[#06211A] border border-[#06211A]/20',
              'hover:bg-[#06211A]/5 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06211A]/30',
            ].join(' ')}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className={[
              'px-4 py-2 text-sm font-medium rounded font-[\'DM_Sans\']',
              'bg-[#06211A] text-[#DBFF66] hover:bg-[#0d3627]',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DBFF66] focus-visible:ring-offset-1',
            ].join(' ')}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  )
}
