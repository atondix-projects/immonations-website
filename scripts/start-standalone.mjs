import { cp, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const standalone = resolve(root, '.next', 'standalone')
const portFlag = process.argv.indexOf('--port')
const requestedPort = portFlag === -1 ? undefined : process.argv[portFlag + 1]

await mkdir(resolve(standalone, '.next'), { recursive: true })
await Promise.all([
  cp(resolve(root, 'public'), resolve(standalone, 'public'), { recursive: true, force: true }),
  cp(resolve(root, '.next', 'static'), resolve(standalone, '.next', 'static'), {
    recursive: true,
    force: true,
  }),
])

process.env.PORT = requestedPort ?? process.env.PORT ?? '3000'
process.env.HOSTNAME ??= 'localhost'

await import(pathToFileURL(resolve(standalone, 'server.js')).href)
