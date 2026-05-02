"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  isProUser: boolean
  conversionCount: number
  showLoginModal: boolean
  showUpgradeModal: boolean
  isLoggingIn: boolean
  isUpgrading: boolean
  setShowLoginModal: (show: boolean) => void
  setShowUpgradeModal: (show: boolean) => void
  login: () => void
  logout: () => void
  upgrade: () => void
  incrementConversion: () => void
  FREE_LIMIT: number
  PRO_PRICE: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const FREE_LIMIT = 3
const PRO_PRICE = "€9.99"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProUser, setIsProUser] = useState(false)
  const [conversionCount, setConversionCount] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isUpgrading, setIsUpgrading] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("isLoggedIn")
    const savedPro = localStorage.getItem("isPro")
    const savedCount = localStorage.getItem("conversionCount")
    
    if (savedLoggedIn === "true") setIsLoggedIn(true)
    if (savedPro === "true") setIsProUser(true)
    if (savedCount) setConversionCount(parseInt(savedCount, 10))
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString())
  }, [isLoggedIn])

  useEffect(() => {
    localStorage.setItem("isPro", isProUser.toString())
  }, [isProUser])

  useEffect(() => {
    localStorage.setItem("conversionCount", conversionCount.toString())
  }, [conversionCount])

  const login = useCallback(() => {
    setIsLoggingIn(true)
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoggingIn(false)
      setShowLoginModal(false)
    }, 1000)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setIsProUser(false)
    setConversionCount(0)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("isPro")
    localStorage.removeItem("conversionCount")
  }, [])

  const upgrade = useCallback(() => {
    // Must be logged in first
    if (!isLoggedIn) {
      setShowUpgradeModal(false)
      setShowLoginModal(true)
      return
    }
    
    setIsUpgrading(true)
    
    // Demo upgrade simulation (no real payment)
    setTimeout(() => {
      setIsProUser(true)
      setShowUpgradeModal(false)
      setConversionCount(0)
      setIsUpgrading(false)
    }, 1000)
  }, [isLoggedIn])

  const incrementConversion = useCallback(() => {
    if (!isProUser) {
      setConversionCount(prev => prev + 1)
    }
  }, [isProUser])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isProUser,
        conversionCount,
        showLoginModal,
        showUpgradeModal,
        isLoggingIn,
        isUpgrading,
        setShowLoginModal,
        setShowUpgradeModal,
        login,
        logout,
        upgrade,
        incrementConversion,
        FREE_LIMIT,
        PRO_PRICE,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
