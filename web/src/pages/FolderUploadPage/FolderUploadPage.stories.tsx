import type { Meta, StoryObj } from '@storybook/react'

import FolderUploadPage from './FolderUploadPage'

const meta: Meta<typeof FolderUploadPage> = {
  component: FolderUploadPage,
}

export default meta

type Story = StoryObj<typeof FolderUploadPage>

export const Primary: Story = {}
