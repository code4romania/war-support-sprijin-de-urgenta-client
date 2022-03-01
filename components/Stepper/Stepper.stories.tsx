import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Stepper from '.'

export default {
  title: 'Stepper',
  component: Stepper,
} as ComponentMeta<typeof Stepper>

const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args} />

export const Default = Template.bind({})
Default.args = {
  steps: ['first', 'second', 'third'],
  activeStep: 2
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}
