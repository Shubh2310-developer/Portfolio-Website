import { useEffect, useState } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

export type Theme = 'light' | 'dark' | 'system'

interface UseThemeReturn {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
  isLight: boolean
  isSystem: boolean
  toggleTheme: () => void
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const currentTheme = (theme as Theme) || 'system'
  const isDark = resolvedTheme === 'dark'
  const isLight = resolvedTheme === 'light'
  const isSystem = currentTheme === 'system'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return {
    theme: currentTheme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    isDark,
    isLight,
    isSystem,
    toggleTheme,
  }
}

// Helper function to get theme-specific styles
export function getThemeStyles(isDark: boolean) {
  return {
    background: isDark ? 'bg-gray-900' : 'bg-white',
    text: isDark ? 'text-gray-100' : 'text-gray-900',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    hover: isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    card: isDark ? 'bg-gray-800' : 'bg-white',
    input: isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
  }
}

// Helper function to get theme-specific colors
export function getThemeColors(isDark: boolean) {
  return {
    primary: isDark ? 'text-blue-400' : 'text-blue-600',
    secondary: isDark ? 'text-gray-400' : 'text-gray-600',
    accent: isDark ? 'text-purple-400' : 'text-purple-600',
    success: isDark ? 'text-green-400' : 'text-green-600',
    error: isDark ? 'text-red-400' : 'text-red-600',
    warning: isDark ? 'text-yellow-400' : 'text-yellow-600',
  }
}

// Helper function to get theme-specific gradients
export function getThemeGradients(isDark: boolean) {
  return {
    primary: isDark
      ? 'from-blue-500 to-purple-600'
      : 'from-blue-400 to-purple-500',
    secondary: isDark
      ? 'from-gray-700 to-gray-900'
      : 'from-gray-100 to-gray-200',
    accent: isDark
      ? 'from-purple-500 to-pink-600'
      : 'from-purple-400 to-pink-500',
  }
}
