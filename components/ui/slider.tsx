"use client"

import React, { useState, useRef, useEffect } from "react"

interface SliderProps {
  value: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, min = 0, max = 100, step = 1, className = "", disabled = false }, ref) => {
    const [currentValue, setCurrentValue] = useState(value[0] || min)
    const sliderRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)

    useEffect(() => {
      setCurrentValue(value[0] || min)
    }, [value, min])

    const getValueFromPosition = (clientX: number) => {
      if (!sliderRef.current) return currentValue

      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const rawValue = min + percentage * (max - min)
      return Math.round(rawValue / step) * step
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      isDragging.current = true
      const newValue = getValueFromPosition(e.clientX)
      setCurrentValue(newValue)
      onValueChange && onValueChange([newValue])
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || disabled) return
      const newValue = getValueFromPosition(e.clientX)
      setCurrentValue(newValue)
      onValueChange && onValueChange([newValue])
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    useEffect(() => {
      if (isDragging.current) {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
          document.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseup", handleMouseUp)
        }
      }
    }, [isDragging.current])

    const percentage = ((currentValue - min) / (max - min)) * 100

    return (
      <div ref={ref} className={`relative flex w-full touch-none select-none items-center ${className}`}>
        <div
          ref={sliderRef}
          className={`relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="h-full bg-blue-600 dark:bg-blue-400 transition-all" style={{ width: `${percentage}%` }} />
          <div
            className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white shadow-lg transition-all dark:border-blue-400 dark:bg-gray-950 ${
              disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"
            }`}
            style={{ left: `calc(${percentage}% - 10px)` }}
          />
        </div>
      </div>
    )
  },
)

Slider.displayName = "Slider"

export { Slider }
