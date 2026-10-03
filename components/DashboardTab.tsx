'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { AnalyticsDashboard } from 'drizzle-cube/client'
import { dashboardConfig as defaultDashboardConfig } from '@/lib/dashboard-config'

const STORAGE_KEY = 'nextjs-dashboard-config'
const listeners = new Set<() => void>()

// localStorage as an external store: the server snapshot is null (so SSR and
// hydration render the default config), then the client reads the saved value.
function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function writeSavedConfig(value: string | null) {
  if (value === null) localStorage.removeItem(STORAGE_KEY)
  else localStorage.setItem(STORAGE_KEY, value)
  // The 'storage' event only fires in other tabs, so notify this one directly
  listeners.forEach(listener => listener())
}

export default function DashboardTab() {
  const savedConfig = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY),
    () => null
  )

  const dashboardConfig = useMemo(() => {
    if (!savedConfig) return defaultDashboardConfig
    try {
      return JSON.parse(savedConfig)
    } catch (error) {
      console.error('Failed to load dashboard config from localStorage:', error)
      return defaultDashboardConfig
    }
  }, [savedConfig])

  // Save dashboard config to localStorage
  const saveDashboardConfig = (newConfig: any) => {
    writeSavedConfig(JSON.stringify(newConfig))
  }

  // Reset to default configuration
  const resetDashboard = () => {
    writeSavedConfig(null)
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">
            Analytics Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={resetDashboard}
              className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              title="Reset to default"
            >
              Reset
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          View employee and productivity metrics across departments. Use the Edit Mode toggle to customize layout and charts.
        </p>
      </div>
      <AnalyticsDashboard 
        config={dashboardConfig}
        editable={true}
        onConfigChange={saveDashboardConfig}
      />
    </div>
  )
}