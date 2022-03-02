import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserDetails from './UserDetails'

export default {
  title: 'UserDetails',
  component: UserDetails,
} as ComponentMeta<typeof UserDetails>

const Template: ComponentStory<typeof UserDetails> = (args) => (
  <UserDetails {...args} />
)

export const Default = Template.bind({})
Default.args = {
  type: 'UserDetails default props',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
