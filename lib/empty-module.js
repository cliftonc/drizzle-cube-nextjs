// Stand-in for drizzle-cube's optional peers (elkjs, @xyflow/react) that this
// example doesn't install. drizzle-cube loads them lazily and degrades
// gracefully when they're unavailable (no schema visualization).
const emptyModule = {}
export default emptyModule
