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

  // Show on all environments for debugging
  return (
    <div className="fixed top-2 left-2 bg-red-600 text-white p-2 rounded text-xs max-w-xs z-50 shadow-lg">
      <div className="font-bold mb-1">🐛 DEBUG</div>
      <div className="space-y-1 text-xs">
        <div><strong>API:</strong> {apiUrl.replace('https://', '')}</div>
        <div><strong>Status:</strong> {apiStatus.substring(0, 20)}...</div>
        <div><strong>Device:</strong> {typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop') : 'Unknown'}</div>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-1 bg-white text-red-600 px-2 py-1 rounded text-xs w-full"
      >
        Reload
      </button>
    </div>
  )
}