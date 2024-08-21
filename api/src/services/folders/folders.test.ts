import type { Folder } from '@prisma/client'

import {
  folders,
  folder,
  createFolder,
  updateFolder,
  deleteFolder,
} from './folders'
import type { StandardScenario } from './folders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('folders', () => {
  scenario('returns all folders', async (scenario: StandardScenario) => {
    const result = await folders()

    expect(result.length).toEqual(Object.keys(scenario.folder).length)
  })

  scenario('returns a single folder', async (scenario: StandardScenario) => {
    const result = await folder({ id: scenario.folder.one.id })

    expect(result).toEqual(scenario.folder.one)
  })

  scenario('creates a folder', async () => {
    const result = await createFolder({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a folder', async (scenario: StandardScenario) => {
    const original = (await folder({ id: scenario.folder.one.id })) as Folder
    const result = await updateFolder({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a folder', async (scenario: StandardScenario) => {
    const original = (await deleteFolder({
      id: scenario.folder.one.id,
    })) as Folder
    const result = await folder({ id: original.id })

    expect(result).toEqual(null)
  })
})
