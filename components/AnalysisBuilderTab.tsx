'use client'

import { AnalysisBuilder } from 'drizzle-cube/client'

export default function AnalysisBuilderTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Analysis Builder
        </h2>
        <p className="text-sm text-gray-600">
          Build custom queries using the interactive analysis builder
        </p>
      </div>
      <div>
        <AnalysisBuilder />
      </div>
    </div>
  )
}