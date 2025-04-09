/* eslint-disable @typescript-eslint/no-empty-object-type */
import type React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className = "", ...props }: LabelProps) {
  return <label className={`text-sm font-medium text-gray-300 ${className}`} {...props} />
}
