'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface CursorPosition {
  x: number
  y: number
}

const DahmCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    
    const target = e.target as HTMLElement
    const cursor = window.getComputedStyle(target).getPropertyValue('cursor')
    setIsPointer(cursor === 'pointer' || target.hasAttribute('data-cursor'))
  }

  const handleMouseLeave = () => setIsHidden(true)
  const handleMouseEnter = () => setIsHidden(false)

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  // Don't render until mounted (SSR compatibility)
  if (!mounted || isHidden) return null

  // Theme-aware colors
  const primaryColor = theme === 'dark' ? '#8E95BF' : '#44428C'
  const secondaryColor = '#FF966A'
  const backgroundColor = theme === 'dark' 
    ? 'rgba(142, 149, 191, 0.1)' 
    : 'rgba(68, 66, 140, 0.05)'

  return (
    <div
      className="dahm-cursor pointer-events-none fixed z-[9999] transition-all duration-150 ease-in-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isPointer ? '40px' : '20px',
        height: isPointer ? '40px' : '20px',
        border: `2px solid ${isPointer ? secondaryColor : primaryColor}`,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: isPointer ? 'rgba(255, 150, 106, 0.1)' : backgroundColor,
        backdropFilter: 'blur(1px)',
        mixBlendMode: 'difference'
      }}
    />
  )
}

export default DahmCursor
