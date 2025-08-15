import { ThemeProvider as NextThemesProvider } from "next-themes"
import type React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
}

// Updated theme provider to disable system theme and set light as default
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
