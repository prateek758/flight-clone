"use client"

import React, { useState } from "react"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, checked = false, onCheckedChange, disabled = false, className = "" }, ref) => {
    const [isChecked, setIsChecked] = useState(checked)

    React.useEffect(() => {
      setIsChecked(checked)
    }, [checked])

    const handleClick = () => {
      if (disabled) return
      const newChecked = !isChecked
      setIsChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        onClick={handleClick}
        disabled={disabled}
        className={`
          peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50 
          dark:border-gray-600 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-400
          ${
            isChecked
              ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-600"
              : "bg-white dark:bg-gray-800"
          }
          ${className}
        `}
      >
        {isChecked && <Check className="h-3 w-3" />}
      </button>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
