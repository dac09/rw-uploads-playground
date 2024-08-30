import path from 'path'

import fastifyStatic from '@fastify/static'

import { createServer } from '@redwoodjs/api-server'

import { logger } from 'src/lib/logger'

async function main() {
  const server = await createServer({
    logger,
    fastifyServerOptions: {
      bodyLimit: 5e8, // Set to 500MB
    },
  })

  server.register(fastifyStatic, {
    root: path.join(process.cwd() + '/uploads'),
    prefix: '/public_uploads',
  })

  await server.start()
}

main()
