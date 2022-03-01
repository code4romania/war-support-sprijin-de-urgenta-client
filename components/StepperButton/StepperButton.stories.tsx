import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import StepperButton from '.'

export default {
  title: 'StepperButton',
  component: StepperButton,
} as ComponentMeta<typeof StepperButton>

const Template: ComponentStory<typeof StepperButton> = (args) => (
  <StepperButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Text goes here',
  direction: 'forward'
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}
