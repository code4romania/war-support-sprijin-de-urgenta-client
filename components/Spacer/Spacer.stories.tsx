import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Spacer from './Spacer'

export default {
  title: 'Spacer',
  component: Spacer,
} as ComponentMeta<typeof Spacer>

const Template: ComponentStory<typeof Spacer> = (args) => <Spacer {...args} />

export const Default = Template.bind({})
Default.args = {
  size: '50px',
  axis: 'horizontal'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
