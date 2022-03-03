import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SignupVolunteering from '.'

export default {
  title: 'Signup/Volunteering',
  component: SignupVolunteering,
} as ComponentMeta<typeof SignupVolunteering>

const Template: ComponentStory<typeof SignupVolunteering> = (args) => (
  <SignupVolunteering {...args} />
)

export const Default = Template.bind({})

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}
