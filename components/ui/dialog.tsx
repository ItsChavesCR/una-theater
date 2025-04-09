/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  )
}

export function DialogContent({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`fixed z-50 w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-white ${className}`}
      {...props}
    >
      {children}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={(e) => {
          e.stopPropagation()
          const dialog = e.currentTarget.closest("[role='dialog']")
          const dialogProps = (dialog as any)?.__dialogProps
          if (dialogProps?.onOpenChange) {
            dialogProps.onOpenChange(false)
          }
        }}
      >
        ✕
      </button>
    </div>
  )
}

export function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
}

export function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className}`} {...props} />
  )
}

export function DialogTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
}

export function DialogDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-gray-400 ${className}`} {...props} />
}
