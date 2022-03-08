import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserTypeForm from '.'

export default {
  title: 'UserTypeForm',
  component: UserTypeForm,
} as ComponentMeta<typeof UserTypeForm>

const Template: ComponentStory<typeof UserTypeForm> = (args) => (
  <UserTypeForm {...args} />
)

export const Default = Template.bind({})

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}
