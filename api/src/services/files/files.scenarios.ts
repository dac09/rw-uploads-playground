import type { Prisma, File } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileCreateArgs>({
  file: {
    one: { data: { path: 'String', folder: { create: { name: 'String' } } } },
    two: { data: { path: 'String', folder: { create: { name: 'String' } } } },
  },
})

export type StandardScenario = ScenarioData<File, 'file'>
