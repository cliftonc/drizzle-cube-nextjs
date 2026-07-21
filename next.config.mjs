/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ES modules
  experimental: {
    esmExternals: true
  },
  // TypeScript 7 no longer exposes the compiler API path that Next.js checks.
  // CI runs `npm run typecheck` separately with TypeScript 7.
  typescript: {
    ignoreBuildErrors: true,
  },
  // CI runs `npm run lint` separately with the TypeScript compiler API shim.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure transpilation for drizzle-cube
  transpilePackages: ['drizzle-cube'],
  // Configure webpack for CSS imports
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('.', import.meta.url).pathname,
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      // Optional peer deps for schema visualization — gracefully handled at runtime
      'elkjs/lib/elk.bundled.js': false,
      '@xyflow/react': false,
    }
    return config
  }
}

export default nextConfig