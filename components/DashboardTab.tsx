'use client'

import { useState } from 'react'
import { AnalyticsDashboard } from 'drizzle-cube/client'
import { dashboardConfig as defaultDashboardConfig } from '@/lib/dashboard-config'

export default function DashboardTab() {
  const [dashboardConfig, setDashboardConfig] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultDashboardConfig
    }

    const savedConfig = localStorage.getItem('nextjs-dashboard-config')
    if (!savedConfig) {
      return defaultDashboardConfig
    }

    try {
      return JSON.parse(savedConfig)
    } catch (error) {
      console.error('Failed to load dashboard config from localStorage:', error)
      return defaultDashboardConfig
    }
  })

  // Save dashboard config to localStorage
  const saveDashboardConfig = (newConfig: any) => {
    setDashboardConfig(newConfig)
    localStorage.setItem('nextjs-dashboard-config', JSON.stringify(newConfig))
  }

  // Reset to default configuration
  const resetDashboard = () => {
    setDashboardConfig(defaultDashboardConfig)
    localStorage.removeItem('nextjs-dashboard-config')
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