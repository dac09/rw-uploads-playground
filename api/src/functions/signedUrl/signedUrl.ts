import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { urlSigner } from 'src/lib/uploads'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  // logger.info(`${event.httpMethod} ${event.path}: signedUrl function`)
  // const { s: signature, expiry, path } = event.queryStringParameters || {}

  const fileToReturn = urlSigner.validateSignedUrl(event.path)
  console.log(`👉 \n ~ fileToReturn:`, fileToReturn)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'signedUrl function',
    }),
  }
}
