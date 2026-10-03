/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure transpilation for drizzle-cube
  transpilePackages: ['drizzle-cube'],
  turbopack: {
    resolveAlias: {
      // Optional peer deps for schema visualization — gracefully handled at runtime
      'elkjs/lib/elk.bundled.js': './lib/empty-module.js',
      '@xyflow/react': './lib/empty-module.js',
    },
  },
}

export default nextConfig
