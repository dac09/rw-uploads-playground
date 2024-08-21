import type { APIGatewayEvent, Context } from 'aws-lambda'

import type { SignatureValidationArgs } from '@redwoodjs/uploads/signedUrl'

import { urlSigner, storage } from 'src/lib/uploads'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  const fileToReturn = urlSigner.validateSignature(
    event.queryStringParameters as SignatureValidationArgs
  )

  const { contents, type } = await storage.read(fileToReturn)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': type,
    },
    body: contents,
  }
}
