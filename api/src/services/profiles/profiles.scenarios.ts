import type { Prisma, Profile } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProfileCreateArgs>({
  profile: {
    one: { data: { firstName: 'String', lastName: 'String' } },
    two: { data: { firstName: 'String', lastName: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Profile, 'profile'>
