"use client"

import { useEffect, useState } from 'react'

export function DebugPanel() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...')
  const [apiUrl, setApiUrl] = useState<string>('')

  useEffect(() => {
    const checkApi = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://highway-delite-v1ur.onrender.com/api'
      setApiUrl(baseUrl)
      
      try {
        const response = await fetch(`${baseUrl}/health`)
        if (response.ok) {
          const data = await response.json()
          setApiStatus(`✅ API Working: ${JSON.stringify(data)}`)
        } else {
          setApiStatus(`❌ API Error: ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        setApiStatus(`❌ Network Error: ${error}`)
      }
    }

    checkApi()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md z-50">
      <div><strong>API URL:</strong> {apiUrl}</div>
      <div><strong>Status:</strong> {apiStatus}</div>
      <div><strong>Environment:</strong> {process.env.NODE_ENV}</div>
    </div>
  )
}